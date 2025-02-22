import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import GenericModal from "../modals/GenericModal";

const DomainModal = ({ domain }) => {
  return (
    <GenericModal icon={faGlobe} className="h-fit">
      {domain}
    </GenericModal>
  );
};

export default DomainModal;
