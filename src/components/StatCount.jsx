import { Dot } from "./ui/Dot";

const StatCount = ({ count, value }) => {
  return (
    <div className="flex items-center gap-2 text-sm">
      <Dot value={value} />
      <span>
        <span className="font-semibold">{count}</span>
      </span>
    </div>
  );
};

export default StatCount;
