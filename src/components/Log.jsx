import { colors } from "../helpers/color";
import { parseJSON } from "../helpers/parse";
import clsx from "clsx";

const format = {
  error: "ERR",
  info: "INF",
  warn: "WRN",
  fatal: "FTL",
};

const Log = ({ log }) => {
  const parsed = parseJSON(log);

  if (parsed["error"] == "Invalid log format") return;

  return (
    <div className="flex flex-wrap gap-x-2 text-sm font-semibold">
      {Object.entries(parsed).map(([key, value], index) => {
        return key === "level" ||
          key === "level" ||
          key === "time" ||
          key === "message" ? (
          <div
            key={index}
            className={clsx(key === "message" ? "-order-2" : "order-first")}
          >
            {" "}
            <span
              className={clsx(
                colors[value] || colors[key] || "text-primary-foreground",
                "w-fit"
              )}
            >
              {key === "time"
                ? new Date(value)
                  .toLocaleString("en-US", {
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: false,
                  })
                  .replace(",", "")
                : format[value] || value}
            </span>{" "}
          </div>
        ) : (
          <div key={index} className="flex">
            <span className="text-blue w-fit text-secondary-foreground">
              {key}=
            </span>
            <span
              className={clsx(
                colors[value] || colors[key] || "text-primary-foreground",
                "w-fit"
              )}
            >
              {value}
            </span>{" "}
          </div>
        );
      })}
    </div>
  );
};

export default Log;
