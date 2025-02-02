import Logs from "../components/Logs";
import GenericModal from "./modals/GenericModal";

const Terminal = () => {
  return (
    <GenericModal title="Logs" className="w-fit h-fit">
      <Logs />
    </GenericModal>
  );
};

export default Terminal;
