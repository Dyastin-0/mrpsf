import { faGear } from "@fortawesome/free-solid-svg-icons";
import useDomains from "../hooks/useDomains";
import useHealth from "../hooks/useHealth";
import Stat from "./Stat";
import Button from "./ui/Button";
import Uptime from "./Uptime";

const Sidebar = () => {
  const { domains } = useDomains();
  const { health } = useHealth();

  const domainEntries = Object.entries(domains || {});
  const healthEntries = Object.entries(health || {});

  const enabledCount = domainEntries.reduce(
    (acc, [, domain]) => acc + (domain.Enabled ? 1 : 0),
    0
  );
  const healthCount = healthEntries.reduce(
    (acc, [, value]) => acc + (value ? 1 : 0),
    0
  );

  return (
    <div className="sticky top-0 flex flex-col h-fit min-w-[200px] gap-3 p-3 rounded-md">
      <Uptime />
      <Stat
        title="Domains"
        count={enabledCount}
        length={domainEntries.length}
        tooltip={{
          g: "Enabled domains",
          r: "Disabled domains",
        }}
      />
      <Stat
        title="Routes"
        count={healthCount}
        length={healthEntries.length}
        tooltip={{
          g: "Healthy routes",
          r: "Unhealthy routes (possibly down)",
        }}
      />
    </div>
  );
};

export default Sidebar;
