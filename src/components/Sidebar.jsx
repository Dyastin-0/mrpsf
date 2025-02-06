import clsx from "clsx";
import useDomains from "../hooks/useDomains";
import useHealth from "../hooks/useHealth";
import useViewport from "../hooks/useViewport";
import Stat from "./Stat";
import Uptime from "./Uptime";
import Separator from "./ui/Separator";
import Button from "./ui/Button";
import { faClock, faGlobe, faRoute } from "@fortawesome/free-solid-svg-icons";
import useModal from "./hooks/useModal";
import StatsModal from "./modals/StatsModal";

const Sidebar = () => {
  const { domains } = useDomains();
  const { health } = useHealth();
  const { viewWidth } = useViewport();
  const { setModal, setOpen } = useModal();

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

  const Domain = () => (
    <Stat
      title="Domains"
      count={enabledCount}
      length={domainEntries.length}
      tooltip={{
        g: "Enabled domains",
        r: "Disabled domains",
      }}
    />
  );

  const Routes = () => (
    <Stat
      title="Routes"
      count={healthCount}
      length={healthEntries.length}
      tooltip={{
        g: "Healthy routes",
        r: "Unhealthy routes (possibly down)",
      }}
    />
  );

  return (
    <div
      className={clsx(
        "sticky top-0 flex flex-col items-end h-fit gap-5 p-3 rounded-md overflow-hidden",
        viewWidth > 600 ? "min-w-[200px]" : "min-w-[50px]"
      )}
    >
      {viewWidth < 600 ? (
        <>
          <Button
            icon={faClock}
            onClick={() => {
              setModal(<StatsModal icon={faClock} component={<Uptime />} />);
              setOpen(true);
            }}
          />
          <Button
            icon={faGlobe}
            onClick={() => {
              setModal(<StatsModal icon={faGlobe} component={<Domain />} />);
              setOpen(true);
            }}
          />
          <Button
            icon={faRoute}
            onClick={() => {
              setModal(<StatsModal icon={faRoute} component={<Routes />} />);
              setOpen(true);
            }}
          />
        </>
      ) : (
        <>
          <Uptime />
          <Domain />
          <Routes />
        </>
      )}
      <Separator />
    </div>
  );
};

export default Sidebar;
