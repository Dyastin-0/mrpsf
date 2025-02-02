import { faTerminal } from "@fortawesome/free-solid-svg-icons";
import useDomains from "../hooks/useDomains";
import useHealth from "../hooks/useHealth";
import Stat from "./Stat";
import Button from "./ui/Button";
import Uptime from "./Uptime";
import useModal from "./hooks/useModal";
import Terminal from "./Terminal";
import Separator from "./ui/Separator";

const Sidebar = () => {
  const { setModal, setOpen } = useModal();
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
    <div className="sticky top-0 flex flex-col items-end h-fit min-w-[200px] gap-3 p-3 rounded-md">
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
      <Separator />
      <Button
        icon={faTerminal}
        className="w-fit bg-[var(--bg-primary)]"
        onClick={() => {
          setModal(<Terminal />);
          setOpen(true);
        }}
      />
    </div>
  );
};

export default Sidebar;
