import clsx from "clsx";
import TruncatedText from "./ui/TruncatedText";

const Domain = ({ domain, config }) => {
  return (
    <div className="grid col-span-1 w-full h-fit gap-3 p-3 bg-secondary rounded-md border border-secondary-accent">
      <TruncatedText text={domain} className="text-xs font-semibold" />
      <span
        className={clsx(
          "rounded-full w-2 h-2",
          config.Enabled ? "bg-green" : "bg-red"
        )}
      />
    </div>
  );
};

export default Domain;
