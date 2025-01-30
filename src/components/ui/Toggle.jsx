import React from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

const Toggle = ({ value, onClick }) => {
  return (
    <div
      className={clsx(
        "relative flex items-center w-8 h-4 rounded-full cursor-pointer",
        "border border-secondary-accent transition-colors duration-300",
        value ? "bg-primary-highlight" : "bg-primary"
      )}
      onClick={onClick}
    >
      <motion.div
        className={clsx(
          "absolute w-3 h-3 rounded-full",
          value ? "bg-primary" : "bg-primary-highlight"
        )}
        initial={{
          x: value ? 17 : 2,
        }}
        animate={{
          x: value ? 17 : 2,
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
