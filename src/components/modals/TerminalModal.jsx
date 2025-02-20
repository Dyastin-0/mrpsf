import { faTerminal } from "@fortawesome/free-solid-svg-icons";
import GenericModal from "./GenericModal";
import { Terminal } from "../Terminal";
import useAxios from "../../hooks/useAxios";
import useToast from "../hooks/useToast";
import { useEffect, useState } from "react";
import useWS from "../../hooks/useWS";
import TerminalInput from "../TerminalInput";
import useTerminal from "../../hooks/useTerminal";

export const TerminalModal = () => {
  const { api } = useAxios();
  const { toastInfo } = useToast();
  const { sendMessage } = useWS();
  const { mutate: setLogs } = useTerminal();
  const [command, setCommand] = useState("");

  const handleConnectTerminal = async () => {
    try {
      await api.post("/ssh");
      toastInfo("SSH connection accepted");
    } catch (error) {
      toastInfo("Failed to connect to SSH");
    }
  };

  const handleSendCommand = (e) => {
    e.preventDefault();
    if (!command.trim()) {
      toastInfo("Empty command");
      return;
    }

    setLogs((prev) => [...prev, `> ${command}`]);
    sendMessage({ SSHCommand: command });
    setCommand("");
  };

  useEffect(() => {
    handleConnectTerminal();

    return () => {
      api.delete("/ssh");
      toastInfo("SSH disconnected");
    };
  }, []);

  return (
    <GenericModal
      icon={faTerminal}
      className="w-fit h-fit"
      containerClassName="flex flex-col"
    >
      <Terminal />
      <TerminalInput
        input={command}
        setInput={setCommand}
        handleSubmit={handleSendCommand}
      />
    </GenericModal>
  );
};
