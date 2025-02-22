import clsx from "clsx";
import { useEffect, useRef } from "react";

const TerminalInput = ({ setInput, input, handleSubmit }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <form onSubmit={handleSubmit} className="flex mt-2">
      <span className="text-primary-highlight">&gt;</span>
      <input
        ref={inputRef}
        type="text"
        className={clsx(
          "flex-1 ml-2 outline-none",
          "font-bold text-primary-highlight placeholder-secondary-foreground",
          "bg-transparent"
        )}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        autoFocus
      />
    </form>
  );
};

export default TerminalInput;
