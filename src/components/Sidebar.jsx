import clsx from "clsx";
import useDomains from "../hooks/useDomains";
import useHealth from "../hooks/useHealth";
import useViewport from "../hooks/useViewport";
import Stat from "./Stat";
import Uptime from "./Uptime";
import Separator from "./ui/Separator";
import Button from "./ui/Button";
import {
  faCircleNodes,
  faClock,
  faDashboard,
  faGlobe,
  faRoute,
  faTerminal,
} from "@fortawesome/free-solid-svg-icons";
import useModal from "./hooks/useModal";
import StatsModal from "./modals/StatsModal";
import { useNavigate } from "react-router-dom";
import Terminal from "./modals/Terminal";

const Sidebar = () => {
  const { domains } = useDomains();
  const { health } = useHealth();
  const { viewWidth } = useViewport();
  const { setModal, setOpen } = useModal();
  const navigate = useNavigate();

  const domainEntries = Object.entries(domains || {});
  const healthEntries = Object.entries(health || {}).flatMap(
    ([_, domainHealth]) => Object.entries(domainHealth)
  );

  const enabledCount = domainEntries.reduce(
    (acc, [, domain]) => acc + (domain.Enabled ? 1 : 0),
    0
  );
  const healthCount = Object.values(health || {}).reduce(
    (acc, domainHealth) => {
      console.log(domainHealth);
      return acc + Object.values(domainHealth).filter((val) => val).length;
    },
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
        "sticky top-0 flex flex-col items-end h-fit gap-3 p-3 rounded-md overflow-hidden",
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
          <Separator />
          <Button icon={faCircleNodes} onClick={() => navigate("/proxies")} />
          <Button icon={faDashboard} onClick={() => navigate("/dashboard")} />
          <Button
            icon={faTerminal}
            onClick={() => {
              setModal(<Terminal />);
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
    </div>
  );
};

export default Sidebar;
