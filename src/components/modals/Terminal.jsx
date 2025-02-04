import { faTerminal } from "@fortawesome/free-solid-svg-icons";
import Logs from "../Logs";
import GenericModal from "./GenericModal";

const Terminal = () => {
  return (
    <GenericModal
      icon={faTerminal}
      className="w-fit h-fit"
      containerClassName="flex gap-2"
    >
      <Logs />
    </GenericModal>
  );
};

export default Terminal;
