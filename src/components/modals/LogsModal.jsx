import { faFileLines } from "@fortawesome/free-solid-svg-icons";
import Logs from "../Logs";
import GenericModal from "./GenericModal";

const LogsModal = () => {
  return (
    <GenericModal
      icon={faFileLines}
      className="w-fit h-fit"
      containerClassName="flex gap-2"
    >
      <Logs />
    </GenericModal>
  );
};

export default LogsModal;
