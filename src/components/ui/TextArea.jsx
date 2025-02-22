import { useRef, useEffect } from "react";

const TextArea = ({ value, onChange, placeholder }) => {
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  return (
    <div className="relative w-full h-full">
      <textarea
        ref={textareaRef}
        rows="1"
        className="outline-none rounded-md bg-secondary text-xs resize-none p-2
        placeholder-secondary-foreground text-primary-foreground scrollbar-none
        transition-colors duration-300 w-full
        focus:shadow-[var(--accent-secondary)_0_0_0_2px]
        active:shadow-[var(--highlight)_0_0_0_2px]"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default TextArea;
