import { useState } from "react";
import useAxios from "../hooks/useAxios";
import RateLimiter from "./RateLimiter";
import Routes from "./Routes";
import Toggle from "./ui/Toggle";
import TruncatedText from "./ui/TruncatedText";
import useAuth from "../hooks/useAuth";
import { Dot } from "./ui/Dot";
import clsx from "clsx";

const Proxy = ({ protocol, domain, config }) => {
  const { api } = useAxios();
  const { token } = useAuth();
  const [enabled, setEnabled] = useState(config.Enabled);

  const handleEnabled = async () => {
    const res = await api.post(`/config/${domain}/enable?t=${token}`, {
      enabled: !enabled,
    });

    if (res.status === 200) {
      setEnabled(!enabled);
    }
  };

  return (
    <div
      className={clsx(
        "grid grid-cols-1 w-full h-full gap-3 rounded-md",
        "text-primary-foreground"
      )}
    >
      <div className="flex gap-2 w-full justify-between items-center">
        <div className="flex gap-2">
          <TruncatedText text={domain} className="text-xs font-semibold" />
          <TruncatedText text={protocol?.toUpperCase()} className="text-xs font-bold" />
        </div>
        <Toggle value={enabled} onClick={handleEnabled} />
      </div>
      <Dot value={enabled} />
      {config.RateLimit && <RateLimiter limiter={config.RateLimit} />}
      <Routes
        protocol={config.Protocol}
        routes={config.Routes}
        domain={domain}
      />
    </div>
  );
};

export default Proxy;
