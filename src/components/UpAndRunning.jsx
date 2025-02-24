import clsx from "clsx";
import useHealth from "../hooks/useHealth";
import TruncatedText from "./ui/TruncatedText";
import { Dot } from "./ui/Dot";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamation } from "@fortawesome/free-solid-svg-icons";

const UpAndRunning = () => {
  const { health } = useHealth();

  const unhealthy = new Map();

  Object.entries(health || {}).forEach(([domain, dests]) => {
    const unhealthyDests = Object.entries(dests)
      .filter(([, isAlive]) => !isAlive)
      .map(([url]) => url);

    if (unhealthyDests.length > 0) {
      unhealthy.set(domain, unhealthyDests);
    }
  });

  return (
    <div
      className={clsx(
        "flex w-full justify-center gap-4 rounded-md",
        "text-xs text-primary-foreground"
      )}
    >
      {unhealthy?.size === 0 ? (
        <div
          className={clsx(
            "rounded-md",
            "text-xl text-center text-transparent font-bold",
            "bg-gradient-to-tl bg-clip-text",
            "from-primary-highlight to-secondary-highlight"
          )}
        >
          Everything is up and running!
        </div>
      ) : (
        <div className="flex flex-col w-full gap-3">
          <div className="flex gap-2 w-full">
            <span className="font-bold  text-yellow-500">WRN</span>
            <h2 className="text-xs font-semibold">Some routes are down</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[...unhealthy.entries()].map(([domain, urls]) => (
              <div
                key={domain}
                className="flex flex-col over p-3 gap-3 bg-secondary rounded-md"
              >
                <h3 className="font-bold">{domain}</h3>
                <div className="flex flex-wrap gap-3">
                  {urls.map((url) => (
                    <div
                      key={url}
                      className="flex overflow-hidden items-center gap-2"
                    >
                      <Dot value={false} />
                      <TruncatedText text={url} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UpAndRunning;
