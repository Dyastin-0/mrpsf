import useLogs from "../hooks/useLogs";
import Log from "../components/Log";

const Logs = () => {
  const { logs } = useLogs();

  return (
    <div
      className="flex flex-col w-[700px] max-w-fit max-h-[450px] overflow-y-auto font-mono gap-3
    custom-scrollbar"
    >
      {logs.length > 0 &&
        logs.map((log, index) => <Log log={log} key={index} />)}
    </div>
  );
};

export default Logs;
