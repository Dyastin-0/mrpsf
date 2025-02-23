import "xterm/css/xterm.css";
import React, { useEffect, useRef } from "react";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import { WebLinksAddon } from "xterm-addon-web-links";
import useWS from "../hooks/useWS";
import useAxios from "../hooks/useAxios";
import useToast from "./hooks/useToast";
import useAuth from "../hooks/useAuth";
import clsx from "clsx";

const XTerm = () => {
  const { token } = useAuth();
  const { api, isAxiosReady } = useAxios();
  const { toastInfo } = useToast();
  const terminalRef = useRef(null);
  const term = useRef(null);
  const fitAddon = useRef(new FitAddon());
  const webLinkAddon = useRef(new WebLinksAddon());
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
    term.current.loadAddon(webLinkAddon.current);
    term.current.open(terminalRef.current);
    fitAddon.current.fit();
    term.current.focus();

    term.current.onData((data) => {
      if (data === "\u0004") {
        term.current.write("\n\nssh disconnected");
      }
      sendMessage({ SSHCommand: data });
    });

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
  }, [sendMessage, setTerminalCallback, token]);

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
      sendMessage({ SSHCommand: "\u0004" });
    };
  }, [isAxiosReady]);

  return (
    <div
      ref={terminalRef}
      className={clsx(
        "h-full w-full pt-3 rounded-md",
        "from-primary-highlight to-secondary-highlight",
        "bg-gradient-to-tr"
      )}
    />
  );
};

export default XTerm;
