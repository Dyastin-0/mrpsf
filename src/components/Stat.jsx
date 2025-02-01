import StatCount from "./StatCount";
import Tooltip from "./ui/Tooltip";
import TruncatedText from "./ui/TruncatedText";

const Stat = ({ title, count, length, tooltip }) => {
  return (
    <div className="flex justify-between gap-2">
      <div className="flex justify-between gap-2">
        <TruncatedText text={title} className="text-sm font-semibold" />
      </div>
      <div className="flex gap-2 text-sm">
        <Tooltip text={tooltip.g}>
          <StatCount count={count} value={true} />
        </Tooltip>
        <Tooltip text={tooltip.r}>
          <StatCount count={length - count} value={false} />
        </Tooltip>
      </div>
    </div>
  );
};

export default Stat;
