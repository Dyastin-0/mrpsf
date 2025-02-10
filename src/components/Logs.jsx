import { Virtuoso } from "react-virtuoso";
import useLogs from "../hooks/useLogs";
import Log from "../components/Log";

const Logs = () => {
  const { logs = [] } = useLogs();

  return (
    <div className="w-[700px] h-[450px] overflow-y-auto font-mono gap-1 custom-scrollbar">
      <Virtuoso
        followOutput
        className="custom-scrollbar"
        style={{ height: "100%" }}
        data={logs}
        overscan={10}
        itemContent={(index) => <Log log={logs[index]} />}
      />
    </div>
  );
};

export default Logs;
