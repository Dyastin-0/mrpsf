import React, { useEffect, useRef } from "react";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import "xterm/css/xterm.css";
import useWS from "../hooks/useWS";
import useAxios from "../hooks/useAxios";
import useToast from "./hooks/useToast";

const XTerm = () => {
  const { api, isAxiosReady } = useAxios();
  const { toastInfo } = useToast();
  const terminalRef = useRef(null);
  const term = useRef(null);
  const fitAddon = useRef(new FitAddon());
  const { sendMessage, setTerminalCallback } = useWS();

  useEffect(() => {
    term.current = new Terminal({
      cursorBlink: true,
      fontSize: 14,
      convertEol: true,
      theme: {
        selectionBackground: "#5331b6",
        cursor: "#5331b6",
      },
    });

    fitAddon.current.activate();
    term.current.loadAddon(fitAddon.current);
    term.current.open(terminalRef.current);
    fitAddon.current.fit();
    term.current.focus();

    term.current.onData((data) => sendMessage({ SSHCommand: data }));

    setTerminalCallback((message) => {
      term.current.write(message);
    });

    const handleResize = () => fitAddon.current.fit();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      term.current.dispose();
      setTerminalCallback(null);
    };
  }, [sendMessage, setTerminalCallback]);

  const handleConnectTerminal = async () => {
    try {
      await api.post("/ssh");
      toastInfo("SSH connected");
    } catch (error) {
      toastInfo("Failed to connect to SSH");
    }
  };

  useEffect(() => {
    if (!isAxiosReady) return;
    handleConnectTerminal();

    return () => {
      api.delete("/ssh");
      toastInfo("SSH disconnected");
    };
  }, [isAxiosReady]);

  return <div ref={terminalRef} className="h-full w-full bg-black"></div>;
};

export default XTerm;
