import TruncatedText from "./ui/TruncatedText";
import { Dot } from "./ui/Dot";

const Domain = ({ domain, config }) => {
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
    <div className="grid col-span-1 w-full h-fit gap-3 p-3 bg-secondary rounded-md">
      <TruncatedText text={domain} className="text-sm font-semibold" />
      <Dot value={config.Enabled} />
      <div className="flex flex-wrap gap-2">
        <div className="flex gap-2 items-center font-semibold">
          &#8226;
          <TruncatedText
            text={`${config?.SortedRoutes?.length || 0}  ${
              config?.SortedRoutes?.length > 1 ? "routes" : "route"
            }`}
            className="text-sm text-primary-highlight"
          />
        </div>
        <div className="flex gap-2 items-center font-semibold">
          &#8226;
          <TruncatedText
            text={`${totalAliveDests || 0} ${
              totalAliveDests > 1 ? "dests" : "dest"
            } alive`}
            className="text-sm"
          />
        </div>
        <div className="flex gap-2 items-center font-semibold">
          &#8226;
          <TruncatedText
            text={`${totalBalancers || 0} ${
              totalBalancers > 1 ? "balancers" : "balancer"
            }`}
            className="text-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default Domain;
