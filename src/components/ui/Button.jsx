import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";

const variants = {
  default: "p-2 text-primary-foreground bg-secondary rounded-md",
  default_rounded: "p-2 text-primary-foreground bg-secondary rounded-full",
  danger:
    "p-2 font-semibold bg-secondary text-danger rounded-md hover:bg-danger hover:text-primary-foreground",
  link: "text-primary-foreground font-bold transition-all duration-300 hover:cursor-pointer hover:text-primary-highlight focus:shadow-[var(--highlight)_0_2px_0_0] pb-1",
  ghost: "text-primary-foreground rounded-md p-2",
  simple:
    "flex items-center justify-center text-md text-center font-semibold transition-all duration-300 outline-none active:text-primary-highlight",
};

const Button = ({
  text,
  type,
  onClick,
  onBlur,
  variant = "default",
  className = "",
  onMouseEnter,
  onFocus,
  disabled,
  icon,
  end = false,
}) => {
  return (
    <button
      disabled={disabled}
      onMouseEnter={onMouseEnter}
      className={clsx(
        className,
        "flex h-fit items-center gap-1",
        "outline-none transition-all duration-300",
        "font-semibold",
        "hover:bg-secondary-accent",
        end ? "justify-end" : "justify-center",
        variants[variant]
      )}
      type={type}
      onClick={onClick}
      onBlur={onBlur}
      onFocus={onFocus}
    >
      {text}
      {icon && (
        <div className="flex items-center justify-center min-w-[14px] min-h-[14px] max-h-[18px] max-w-[18px]">
          {<FontAwesomeIcon icon={icon} />}
        </div>
      )}
    </button>
  );
};

export default Button;
