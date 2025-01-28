import { faX } from "@fortawesome/free-solid-svg-icons";
import useModal from "../hooks/useModal";
import Button from "../ui/Button";
import TruncatedText from "../ui/TruncatedText";
import clsx from "clsx";

const GenericModal = ({ title, children, className, containerClassName }) => {
  const { setOpen } = useModal();

  return (
    <div
      className={clsx(
        "relative flex flex-col h-[75vh] w-[400px] max-w-full p-3 gap-3 rounded-md bg-primary",
        "text-xs text-primary-foreground border border-secondary-accent overflow-hidden z-50",
        className
      )}
    >
      <div className="flex items-end font-semibold gap-2 text-xs">
        <div className="flex-1 min-w-0">
          <TruncatedText text={title} />
        </div>
        <Button
          icon={faX}
          onClick={() => setOpen(false)}
          variant="ghost"
          className="w-fit"
        />
      </div>

      <div
        className={
          "scrollbar-thin scrollbar-track-transparent scrollbar-thumb-black" +
          containerClassName
        }
      >
        {children}
      </div>
    </div>
  );
};

export default GenericModal;
