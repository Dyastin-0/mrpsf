import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useHealth from "../hooks/useHealth";
import { Dot } from "./ui/Dot";
import TruncatedText from "./ui/TruncatedText";
import { faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

const Routes = ({ protocol, routes, domain }) => {
  const { health } = useHealth();

  return (
    <>
      <h3 className="text-xs font-semibold">Routes</h3>
      {Object.entries(routes).map(([path, routeConfig]) => {
        const url = protocol === "http" ?
          health[domain][routeConfig.Balancer.Dests[0].URL] :
          health[domain][routeConfig.BalancerTCP.Dests[0].URL]
        const destLen = protocol === "http" ?
          routeConfig.Balancer.Dests.length :
          routeConfig.BalancerTCP.Dests.length

        return <div key={path} className="flex flex-col gap-2 items-center">
          <div className="flex w-full items-center gap-2">
            <Dot
              value={
                health && url
              }
            />
            <div className="flex items-center gap-2">
              <a
                href={`${protocol !== "" || protocol !== "https" ? "http" : "https"
                  }://${domain}${path}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs hover:text-primary-highlight"
                onClick={(e) => e.stopPropagation()}
              >
                <FontAwesomeIcon icon={faUpRightFromSquare} />
              </a>
              <TruncatedText
                text={path}
                className="text-xs text-primary-highlight"
              />
            </div>
            <TruncatedText
              text={routeConfig.Balancer?.Dests[0]?.URL}
              className="text-xs text-secondary-foreground"
            />
            {routeConfig.RewriteRule.Type !== "" && (
              <TruncatedText
                text={routeConfig.RewriteRule.Value}
                className="text-xs text-secondary-foreground"
              />
            )}
            {routeConfig.RewriteRule.Type === "regex" ? (
              <TruncatedText
                text={applyRegex(
                  path,
                  routeConfig.RewriteRule.Value,
                  routeConfig.RewriteRule.ReplaceVal
                )}
                className="text-xs text-primary-highlight"
              />
            ) : routeConfig.RewriteRule.Type === "prefix" ? (
              <TruncatedText
                text={path.replace(
                  routeConfig.RewriteRule.Value,
                  routeConfig.RewriteRule.ReplaceVal
                )}
                className="text-xs text-primary-highlight"
              />
            ) : (
              <TruncatedText
                text={path}
                className="text-xs text-primary-highlight"
              />
            )}
          </div>
          {destLen > 1 && (
            <div className="flex flex-col w-full gap-2 ml-8">
              <h3 className="text-xs">Balancer</h3>
              {routeConfig.Balancer.Dests.map((dest, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Dot value={health && health[domain][dest.URL]} />
                  <TruncatedText text={dest.URL} className="text-xs" />
                </div>
              ))}
            </div>
          )}
        </div>
      }

      )}

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
