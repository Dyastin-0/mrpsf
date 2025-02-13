import useHealth from "../hooks/useHealth";
import { Dot } from "./ui/Dot";
import TruncatedText from "./ui/TruncatedText";

const Routes = ({ routes, domain }) => {
  const { health } = useHealth();

  return (
    <>
      <h3 className="text-xs font-semibold">Routes</h3>
      {Object.entries(routes).map(([path, routeConfig]) => (
        <div key={path} className="flex flex-col gap-2 items-center">
          <div className="flex w-full items-center gap-2">
            <Dot
              value={
                health && health[domain][routeConfig.Balancer.Dests[0].URL]
              }
            />
            <TruncatedText
              text={path}
              className="text-xs text-primary-highlight font-semibold"
            />
            <TruncatedText
              text={routeConfig.Balancer?.Dests[0]?.URL}
              className="text-xs font-semibold"
            />
            {routeConfig.RewriteRule.Type !== "" && (
              <TruncatedText
                text={routeConfig.RewriteRule.Value}
                className="text-xs font-semibold"
              />
            )}
            {routeConfig.RewriteRule.Type === "regex" ? (
              <TruncatedText
                text={applyRegex(
                  path,
                  routeConfig.RewriteRule.Value,
                  routeConfig.RewriteRule.ReplaceVal
                )}
                className="text-xs text-primary-highlight font-semibold"
              />
            ) : routeConfig.RewriteRule.Type === "prefix" ? (
              <TruncatedText
                text={path.replace(
                  routeConfig.RewriteRule.Value,
                  routeConfig.RewriteRule.ReplaceVal
                )}
                className="text-xs text-primary-highlight font-semibold"
              />
            ) : (
              <TruncatedText
                text={path}
                className="text-xs font-semibold text-primary-highlight"
              />
            )}
          </div>
          {routeConfig.Balancer.Dests.length > 1 && (
            <div className="flex flex-col w-full gap-2 ml-8">
              <h3 className="text-xs font-semibold">Balancer</h3>
              {routeConfig.Balancer.Dests.map((dest, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Dot value={health && health[domain][dest.URL]} />
                  <TruncatedText
                    text={dest.URL}
                    className="text-xs font-semibold"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </>
  );
};

const applyRegex = (value, regexString, replaceVal) => {
  const regex = new RegExp(regexString);

  if (!value.endsWith("/")) {
    value = value + "/";
  }

  return value.replace(regex, replaceVal);
};

export default Routes;
