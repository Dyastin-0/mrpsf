import React from "react";
import { colors } from "../helpers/color";
import { parseJSON } from "../helpers/parse";
import clsx from "clsx";

const Log = ({ log }) => {
  const parsed = parseJSON(log);

  return (
    <div className="flex flex-wrap gap-2 text-sm">
      {Object.entries(parsed).map(([key, value], index) => {
        return (
          <div key={index} className="flex">
            <span className="text-primary-foreground w-fit">{key}=</span>
            <span
              className={clsx(
                colors[value] || "text-primary-foreground",
                "font-semibold w-fit"
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
