import TruncatedText from "./ui/TruncatedText";
import { Dot } from "./ui/Dot";
import clsx from "clsx";
import useModal from "./hooks/useModal";
import Proxy from "./Proxy";
import DomainModal from "./hooks/DomainModal";

const Domain = ({ domain, config }) => {
  const { setModal, setOpen } = useModal();

  const totalBalancers = Object.values(config.Routes || {}).reduce(
    (routeSum, route) => {
      const length = route.Balancer?.Dests?.length;
      return routeSum + (length > 1 ? length : 0);
    },
    0
  );

  const totalAliveDests = Object.values(config.Routes || {}).reduce(
    (routeSum, route) => {
      return (
        routeSum +
        (route.Balancer?.Dests?.filter((dest) => dest.Alive).length || 0)
      );
    },
    0
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
        "text-primary-foreground font-semibold",
        "from-primary-highlight to-secondary-highlight",
        "bg-secondary"
      )}
    >
      <TruncatedText text={domain} className="text-xs" />
      <Dot value={config.Enabled} />
      <div className="flex flex-wrap gap-2 font-normal">
        <div className="flex gap-2 items-center">
          &#8226;
          <TruncatedText
            text={`${config?.SortedRoutes?.length || 0}  ${
              config?.SortedRoutes?.length > 1 ? "routes" : "route"
            }`}
            className="text-xs text-primary-highlight"
          />
        </div>
        <div className="flex gap-2 items-center">
          &#8226;
          <TruncatedText
            text={`${totalAliveDests || 0} ${
              totalAliveDests > 1 ? "dests" : "dest"
            } alive`}
            className="text-xs"
          />
        </div>
        <div className="flex gap-2 items-center">
          &#8226;
          <TruncatedText
            text={`${totalBalancers || 0} ${
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
