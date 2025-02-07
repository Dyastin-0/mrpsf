import { useState } from "react";
import useLogs from "../hooks/useLogs";
import Log from "../components/Log";

const Logs = () => {
  const { window, moveWindow } = useLogs();
  const [touchStartY, setTouchStartY] = useState(0);

  const handleWheel = (event) => {
    const delta = event.deltaY;
    if (delta < 0) {
      moveWindow(1); // Scrolling up
    } else if (delta > 0) {
      moveWindow(-1); // Scrolling down
    }
  };

  const handleTouchStart = (event) => {
    setTouchStartY(event.touches[0].clientY);
  };

  const handleTouchMove = (event) => {
    const touchEndY = event.touches[0].clientY;
    const deltaY = touchEndY - touchStartY;

    if (deltaY > 10) {
      moveWindow(1); // Swiping down (scrolling up)
    } else if (deltaY < -10) {
      moveWindow(-1); // Swiping up (scrolling down)
    }
  };

  return (
    <div
      className="flex flex-col w-[700px] max-w-fit max-h-[450px] overflow-hidden font-mono gap-1 custom-scrollbar"
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      {window.length > 0 &&
        window.map((log, index) => <Log log={log} key={index} />)}
    </div>
  );
};

export default Logs;
