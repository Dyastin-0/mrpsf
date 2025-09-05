import "xterm/css/xterm.css";
import { useEffect, useRef } from "react";
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
  const sessionIDRef = useRef("");

  useEffect(() => {
    term.current = new Terminal({
      cursorBlink: true,
      fontSize: 14,
      convertEol: true,
    });

    fitAddon.current.activate();
    term.current.loadAddon(fitAddon.current);
    term.current.loadAddon(webLinkAddon.current);
    term.current.open(terminalRef.current);
    fitAddon.current.fit();
    term.current.focus();

    term.current.onData((data) => {
      if (data === "\u0004") {
        sendMessage({ SSHCommand: data, SessionID: sessionIDRef.current });
        return;
      }
      sendMessage({ SSHCommand: data, SessionID: sessionIDRef.current });
    });

    setTerminalCallback((rcev) => {
      if (rcev.type === "sshSessionID") {
        sessionIDRef.current = rcev.message;
        sendMessage({
          SSHCommand: "resize",
          Rows: term.current.rows,
          Cols: term.current.cols,
          SessionID: sessionIDRef.current,
        });
        return;
      }

      term.current.write(rcev.message);
    });

    const handleResize = () => {
      fitAddon.current.fit();
      sendMessage({
        type: "resize",
        rows: term.current.rows,
        cols: term.current.cols,
        SessionID: sessionIDRef.current,
      });
    };

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
      toastInfo("ssh connected");
    } catch (error) {
      toastInfo("failed to connect to ssh");
    }
  };

  useEffect(() => {
    if (!isAxiosReady) return;
    handleConnectTerminal();
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
