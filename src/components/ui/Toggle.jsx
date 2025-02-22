import React from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

const Toggle = ({ value, onClick }) => {
  return (
    <div
      className={clsx(
        "relative flex items-center min-w-8 h-4 rounded-full cursor-pointer",
        "transition-colors duration-300 border border-secondary-accent",
        value ? "bg-primary-highlight" : "bg-primary"
      )}
      onClick={onClick}
    >
      <motion.div
        className={clsx(
          "absolute w-[.75rem] h-[.75rem] rounded-full",
          value ? "bg-primary" : "bg-primary-highlight"
        )}
        initial={{
          x: value ? 16 : 3,
        }}
        animate={{
          x: value ? 16 : 3,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
        }}
      />
    </div>
  );
};

export default Toggle;
