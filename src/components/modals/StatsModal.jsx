import GenericModal from "./GenericModal";

const UptimeModal = ({ icon, component }) => {
  return (
    <GenericModal icon={icon} className="h-fit">
      {component}
    </GenericModal>
  );
};

export default UptimeModal;
