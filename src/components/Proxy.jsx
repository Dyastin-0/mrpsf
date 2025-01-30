import { useState } from "react";
import useAxios from "../hooks/useAxios";
import RateLimiter from "./RateLimiter";
import Routes from "./Routes";
import Toggle from "./ui/Toggle";
import TruncatedText from "./ui/TruncatedText";

const Proxy = ({ domain, config }) => {
  const { api } = useAxios();
  const [enabled, setEnabled] = useState(config.Enabled);

  const handleEnabled = async () => {
    const res = await api.post(`/config/${domain}/enabled`, {
      enabled: !enabled,
    });

    if (res.status === 200) {
      setEnabled(!enabled);
    }
  };

  return (
    <div className="grid grid-cols-1 w-full h-full gap-3 p-3 bg-secondary rounded-md border border-secondary-accent text-primary-foreground">
      <div className="flex gap-2 items-center">
        <TruncatedText text={domain} className="text-xs font-semibold" />
        <Toggle value={enabled} onClick={handleEnabled} />
      </div>
      <span
        className={`rounded-full w-2 h-2 ${enabled ? "bg-green" : "bg-red"}`}
      />
      {config.RateLimit && <RateLimiter limiter={config.RateLimit} />}
      <Routes routes={config.Routes} />
    </div>
  );
};

export default Proxy;
