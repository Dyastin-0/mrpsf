import Domain from "../components/Domain";
import Tooltip from "../components/ui/Tooltip";
import useDomains from "../hooks/useDomains";

const Dashboard = () => {
  const { domains } = useDomains();

  const enabledDomains = Object.entries(domains || {}).filter(
    ([_, config]) => config.Enabled
  );
  const disabledDomains = Object.entries(domains || {}).filter(
    ([_, config]) => !config.Enabled
  );

  return (
    <div className="flex w-full h-[calc(100%-3rem)] justify-center bg-primary rounded-md p-3 mr-3 mb-3">
      <div className="grid lg:grid-cols-3 md:grid-cols-3 grid-cols-1 w-full h-fit gap-3">
        <div className="col-span-full">
          <h2 className="text-xs font-semibold mb-2">Active Domains</h2>
          <div className="grid lg:grid-cols-3 md:grid-cols-3 grid-cols-1 gap-3">
            {enabledDomains.map(([domain, config]) => (
              <Tooltip text={`Configure ${domain}`}>
                <Domain key={domain} domain={domain} config={config} />
              </Tooltip>
            ))}
          </div>
        </div>
        <div className="col-span-full">
          <h2 className="text-xs font-semibold mb-2">Inactive Domains</h2>
          <div className="grid lg:grid-cols-3 md:grid-cols-3 grid-cols-1 gap-3">
            {disabledDomains.map(([domain, config]) => (
              <Tooltip text={`Configure ${domain}`}>
                <Domain key={domain} domain={domain} config={config} />
              </Tooltip>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
