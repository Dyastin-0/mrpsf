import clsx from "clsx";
import Domain from "../components/Domain";
import Tooltip from "../components/ui/Tooltip";
import UpAndRunning from "../components/UpAndRunning";
import useDomains from "../hooks/useDomains";

const Dashboard = () => {
  const { domains } = useDomains();

  const enabledDomains = Object.entries(domains || {}).filter(
    ([_, config]) => config.Enabled
  );
  const disabledDomains = Object.entries(domains || {}).filter(
    ([_, config]) => !config.Enabled
  );

  const hasEnabled = enabledDomains?.length > 0;
  const hasDisabled = disabledDomains?.length > 0;

  return (
    <div
      className={clsx(
        "relative flex flex-col w-full h-[calc(100%-3rem)]",
        "rounded-md gap-3 p-3 mr-3 mb-3",
        "bg-primary"
      )}
    >
      <UpAndRunning />
      <div className="grid lg:grid-cols-3 md:grid-cols-3 grid-cols-1 w-full h-fit gap-3">
        {hasEnabled && (
          <div className="col-span-full">
            <h2 className="text-xs font-semibold mb-2">
              {enabledDomains.length > 1 ? "Active Domains" : "Active Domain"}
            </h2>
            <div className="grid lg:grid-cols-3 md:grid-cols-3 grid-cols-1 gap-3">
              {enabledDomains.map(([domain, config]) => (
                <Tooltip key={domain} text={`Configure ${domain}`}>
                  <Domain protocol={config.Protocol} domain={domain} config={config} />
                </Tooltip>
              ))}
            </div>
          </div>
        )}
        {hasDisabled && (
          <div className="col-span-full">
            <h2 className="text-xs font-semibold mb-2">
              {disabledDomains.length > 1
                ? "Inactive Domains"
                : "Inactive Domain"}
            </h2>
            <div className="grid lg:grid-cols-3 md:grid-cols-3 grid-cols-1 gap-3">
              {disabledDomains.map(([domain, config]) => (
                <Tooltip key={domain} text={`Configure ${domain}`}>
                  <Domain protocol={config.Protocol} domain={domain} config={config} />
                </Tooltip>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
