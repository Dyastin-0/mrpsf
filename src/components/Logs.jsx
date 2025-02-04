import useLogs from "../hooks/useLogs";
import Log from "../components/Log";

const Logs = () => {
  const { window, moveWindow } = useLogs();

  const handleWheel = (event) => {
    const delta = event.deltaY;

    if (delta < 0) {
      moveWindow(1);
    } else if (delta > 0) {
      moveWindow(-1);
    }
  };

  return (
    <div
      className="flex flex-col w-[700px] max-w-fit max-h-[450px] overflow-hidden font-mono gap-1 custom-scrollbar"
      onWheel={handleWheel}
    >
      {window.length > 0 &&
        window.map((log, index) => <Log log={log} key={index} />)}
    </div>
  );
};

export default Logs;
