import clsx from "clsx";
import Proxy from "../components/Proxy";
import useLogs from "../hooks/useLogs";
import Log from "../components/Log";

const Logs = () => {
  const { logs } = useLogs();

  return (
    <div
      className="flex w-[calc(100%-.75rem)] h-[calc(100%-.75rem)] justify-center bg-primary text-primary-foreground rounded-md p-3
      mr-3 mb-3 overflow-y-auto font-mono"
    >
      <div className="flex flex-col w-full h-fit">
        {logs.length > 0 &&
          logs.map((log, index) => <Log log={log} key={index} />)}
      </div>
    </div>
  );
};

export default Logs;
