import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { Link as DomLink, useLocation } from "react-router-dom";

const Link = ({ path, icon, name, onClick, className }) => {
  const location = useLocation();

  return (
    <DomLink
      onClick={onClick}
      to={path}
      className={clsx(
        "flex items-center justify-center text-md text-center font-semibold",
        "transition-all duration-300 outline-none rounded-full",
        "hover:bg-secondary-accent hover:cursor-pointer",
        "active:shadow-[var(--highlight)_0_0_0_2px]",
        "from-primary-highlight to-secondary-highlight",
        path === location.pathname &&
          "text-primary-highlight-foreground bg-gradient-to-tl",
        className
      )}
    >
      {icon && (
        <span className="flex w-[30px] h-[30px] justify-center items-center">
          <FontAwesomeIcon icon={icon} />
        </span>
      )}
      {name && <span className="text-xs p-2">{name}</span>}
    </DomLink>
  );
};

export default Link;
