import clsx from "clsx";
import TruncatedText from "./ui/TruncatedText";
import { Dot } from "./ui/Dot";

const Domain = ({ domain, config }) => {
  return (
    <div className="grid col-span-1 w-full h-fit gap-3 p-3 bg-secondary rounded-md">
      <TruncatedText text={domain} className="text-sm font-semibold" />
      <Dot value={config.Enabled} />
    </div>
  );
};

export default Domain;
