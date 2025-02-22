import clsx from "clsx";
import useDomains from "../hooks/useDomains";
import useHealth from "../hooks/useHealth";
import useViewport from "../hooks/useViewport";
import Stat from "./Stat";
import Uptime from "./Uptime";
import Separator from "./ui/Separator";
import Button from "./ui/Button";
import {
  faClock,
  faDashboard,
  faGlobe,
  faRoute,
  faFile,
  faTerminal,
} from "@fortawesome/free-solid-svg-icons";
import useModal from "./hooks/useModal";
import StatsModal from "./modals/StatsModal";
import { useNavigate } from "react-router-dom";
import LogsModal from "./modals/LogsModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
        "sticky flex flex-col h-[calc(100vh-1.5rem)] top-3 gap-3 p-3 rounded-md",
        "text-primary-highlight-foreground",
        "from-primary-highlight to-secondary-highlight",
        "bg-gradient-to-tl",
        viewWidth > 768 ? "min-w-[200px]" : "min-w-[50px]"
      )}
    >
      {viewWidth < 768 ? (
        <div className="flex flex-col gap-1">
          <Button
            className={clsx(
              "bg-transparent text-primary-highlight-foreground w-full",
              "text-lg"
            )}
            icon={faClock}
            onClick={() => {
              setModal(<StatsModal icon={faClock} component={<Uptime />} />);
              setOpen(true);
            }}
          />
          <Button
            className={clsx(
              "bg-transparent text-primary-highlight-foreground w-full",
              "text-lg",
              "hover:bg-secondary-highlight"
            )}
            icon={faGlobe}
            onClick={() => {
              setModal(<StatsModal icon={faGlobe} component={<Domain />} />);
              setOpen(true);
            }}
          />
          <Button
            className={clsx(
              "bg-transparent text-primary-highlight-foreground w-full",
              "text-lg",
              "hover:bg-secondary-highlight"
            )}
            icon={faRoute}
            onClick={() => {
              setModal(<StatsModal icon={faRoute} component={<Routes />} />);
              setOpen(true);
            }}
          />
          <Button
            className={clsx(
              "bg-transparent text-primary-highlight-foreground w-full",
              "text-lg",
              "hover:bg-secondary-highlight"
            )}
            icon={faDashboard}
            onClick={() => navigate("/dashboard")}
          />
          <Button
            className={clsx(
              "bg-transparent text-primary-highlight-foreground w-full",
              "text-lg",
              "hover:bg-secondary-highlight"
            )}
            icon={faFile}
            onClick={() => {
              setModal(<LogsModal />);
              setOpen(true);
            }}
          />
          <Button
            className={clsx(
              "bg-transparent text-primary-highlight-foreground w-full",
              "text-lg",
              "hover:bg-secondary-highlight"
            )}
            icon={faTerminal}
            onClick={() => navigate("/terminal")}
          />
        </div>
      ) : (
        <>
          <div className="flex   w-full gap-2 justify-between">
            <FontAwesomeIcon icon={faClock} />
            <Uptime />
          </div>
          <div className="flex w-full gap-2 justify-between">
            <FontAwesomeIcon icon={faGlobe} />
            <Domain />
          </div>
          <div className="flex w-full gap-2 justify-between">
            <FontAwesomeIcon icon={faRoute} />
            <Routes />
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
