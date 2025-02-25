import TruncatedText from "./ui/TruncatedText";
import { Dot } from "./ui/Dot";
import clsx from "clsx";
import useModal from "./hooks/useModal";
import Proxy from "./Proxy";
import DomainModal from "./hooks/DomainModal";
import useHealth from "../hooks/useHealth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

const Domain = ({ domain, config }) => {
  const { setModal, setOpen } = useModal();
  const { health } = useHealth();

  const { totalBalancers, totalAliveDests } = Object.values(
    config.Routes || {}
  ).reduce(
    (acc, route) => {
      const dests = route.Balancer?.Dests || [];
      acc.totalBalancers += dests.length > 1 ? dests.length : 0;

      acc.totalAliveDests += dests.filter(
        (dest) => health?.[domain]?.[dest.URL] === true
      ).length;

      return acc;
    },
    { totalBalancers: 0, totalAliveDests: 0 }
  );

  return (
    <div
      onClick={() => {
        setModal(
          <DomainModal domain={<Proxy domain={domain} config={config} />} />
        );
        setOpen(true);
      }}
      className={clsx(
        "grid col-span-1 w-full h-fit gap-3 p-3 rounded-md",
        "text-primary-highlight-foreground font-semibold",
        "hover:cursor-pointer",
        "from-primary-highlight to-secondary-highlight",
        "bg-gradient-to-b bg-fixed"
      )}
    >
      <div className="flex items-center gap-2">
        <TruncatedText text={domain} className="text-xs" />
        <a
          href={`${
            config.Protocol !== "" || config.Protocol !== "https"
              ? "http"
              : "https"
          }://${domain}`}
          target="_blank"
          rel="noopener noreferrer"
          className={clsx(
            "outline-none transition-all duration-300",
            "text-xs",
            "hover:text-primary-highlight",
            "focus:text-primary-highlight"
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <FontAwesomeIcon icon={faUpRightFromSquare} />
        </a>
      </div>
      <Dot value={config.Enabled} />
      <div className="flex flex-wrap gap-2 font-normal">
        <div className="flex gap-2 items-center">
          &#8226;
          <TruncatedText
            text={`${config?.SortedRoutes?.length || 0} ${
              config?.SortedRoutes?.length > 1 ? "routes" : "route"
            }`}
            className="text-xs"
          />
        </div>
        <div className="flex gap-2 items-center">
          &#8226;
          <TruncatedText
            text={`${totalAliveDests} ${
              totalAliveDests > 1 ? "dests" : "dest"
            } alive`}
            className="text-xs"
          />
        </div>
        <div className="flex gap-2 items-center">
          &#8226;
          <TruncatedText
            text={`${totalBalancers} ${
              totalBalancers > 1 ? "balancers" : "balancer"
            }`}
            className="text-xs"
          />
        </div>
      </div>
    </div>
  );
};

export default Domain;
