import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const Accordion = ({ title, text, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);

  const toggleAccordion = () => {
    setIsOpen((prev) => !prev);
  };

  const handleFocus = () => {
    setIsOpen(true);
  };

  const handleBlur = (e) => {
    if (!contentRef.current.contains(e.relatedTarget)) {
      setIsOpen(false);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-full text-primary-foreground rounded-md bg-secondary p-2">
      <button
        className="flex w-full outline-none items-center justify-between text-primary-foreground text-xs font-semibold
        transition-colors duration-300 focus:text-primary-highlight hover:text-primary-highlight"
        onClick={toggleAccordion}
      >
        <div className="flex items-center gap-1 justify-between">
          {title}
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <FontAwesomeIcon icon={faChevronDown} />
          </motion.div>
        </div>
        <span className="text-end text-secondary-foreground">{text}</span>
      </button>

      <motion.div
        initial={{ height: 0 }}
        animate={{ height: isOpen ? "auto" : 0 }}
        className="overflow-hidden"
        transition={{ duration: 0.3 }}
        ref={contentRef}
        onFocus={handleFocus}
        onBlur={handleBlur}
        tabIndex={-1}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default Accordion;
