import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";

const Checkbox = ({ name, onChecked, value = false }) => {
  return (
    <button
      className={`flex flex-1 w-fit pl-2 pr-2 pt-1 pb-1 gap-1 rounded-md justify-center items-center	
			text-primary-foreground shadow-sm outline-none transition-all duration-300
      hover:shadow-[var(--accent-secondary)_0_0_0_2px] active:shadow-[var(--highlight)_0_0_0_2px]
			hover:cursor-pointer focus:shadow-[var(--accent-secondary)_0_0_0_2px]
      ${
        value
          ? "bg-primary-highlight text-primary-highlight-foreground"
          : "bg-secondary text-primary-foreground"
      }`}
      onClick={onChecked}
      type="button"
    >
      <p className="text-xs">{name}</p>
    </button>
  );
};

export default Checkbox;
