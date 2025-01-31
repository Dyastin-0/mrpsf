import useHealth from "../hooks/useHealth";
import TruncatedText from "./ui/TruncatedText";

const Routes = ({ routes }) => {
  const { health } = useHealth();

  return (
    <>
      <h3 className="text-xs font-semibold">Routes</h3>
      {Object.entries(routes).map(([path, routeConfig]) => (
        <div key={path} className="flex gap-2">
          <div className="flex gap-2 items-center">
            <span
              className={`rounded-full w-2 h-2 ${
                health && health[routeConfig.Dest] > 0 ? "bg-green" : "bg-red"
              }`}
            />
            <TruncatedText
              text={path}
              className="text-xs text-primary-highlight font-semibold"
            />
            <TruncatedText
              text={routeConfig.Dest}
              className="text-xs font-semibold"
            />
          </div>
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
