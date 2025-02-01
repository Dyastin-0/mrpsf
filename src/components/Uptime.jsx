import { useState, useEffect } from "react";
import useAxios from "../hooks/useAxios";
import useSWR from "swr";
import dayjs from "dayjs";

const Uptime = () => {
  const { api, isAxiosReady } = useAxios();
  const { data: uptime } = useSWR(
    isAxiosReady ? "/config/uptime" : null,
    async () => {
      const { data } = await api.get("/config/uptime");
      return data;
    }
  );

  const [elapsed, setElapsed] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    if (!uptime) return;

    const updateElapsedTime = () => {
      const secondsElapsed = dayjs().unix() - uptime;

      const hours = Math.floor(secondsElapsed / 3600);
      const minutes = Math.floor((secondsElapsed % 3600) / 60);
      const seconds = secondsElapsed % 60;

      setElapsed({ hours, minutes, seconds });
    };

    updateElapsedTime();
    const interval = setInterval(updateElapsedTime, 1000);

    return () => clearInterval(interval);
  }, [uptime]);

  return uptime ? (
    <div className="flex w-full justify-between gap-2 text-primary-foreground">
      <h1 className="text-xs font-semibold">Uptime</h1>
      <div className="flex font-semibold gap-1">
        {elapsed.hours > 0 && (
          <span className="text-sm text-semibold">{elapsed.hours} hours</span>
        )}
        {elapsed.minutes > 0 && (
          <span className="text-sm">{elapsed.minutes} m</span>
        )}
        {elapsed.seconds >= 0 && (
          <span className="text-sm">{elapsed.seconds} s</span>
        )}
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default Uptime;
