import { useEffect } from "react";
import useTerminal from "../hooks/useTerminal";
import { Virtuoso } from "react-virtuoso";

export const Terminal = () => {
  const { logs, mutate } = useTerminal();

  useEffect(() => {
    mutate([]);
  }, []);

  return (
    <div className="w-[700px] h-[450px] overflow-y-auto font-mono gap-1 custom-scrollbar font-semibold">
      <Virtuoso
        followOutput
        className="custom-scrollbar"
        style={{ height: "100%" }}
        data={logs}
        overscan={10}
        itemContent={(index) => (
          <span key={index} className="whitespace-pre-wrap">
            {logs[index]}
          </span>
        )}
      />
    </div>
  );
};
