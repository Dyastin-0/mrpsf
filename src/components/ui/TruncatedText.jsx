import clsx from "clsx";
import Tooltip from "./Tooltip";

const TruncatedText = ({ text, tooltip = true, className }) => {
  return tooltip ? (
    <Tooltip text={text} className="overflow-hidden">
      <span className={clsx("block truncate text-ellipsis", className)}>
        {text}
      </span>
    </Tooltip>
  ) : (
    <span className="block truncate">{text}</span>
  );
};

export default TruncatedText;
