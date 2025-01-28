import RateLimiter from "./RateLimiter";
import Routes from "./Routes";
import TruncatedText from "./ui/TruncatedText";

const Proxy = ({ domain, config }) => {
  return (
    <div className="grid grid-cols-1 w-full h-full gap-3 p-3 bg-secondary rounded-md border border-secondary-accent text-primary-foreground">
      <TruncatedText text={domain} className="text-xs font-semibold" />
      <span
        className={`rounded-full w-2 h-2 ${
          config.Enabled ? "bg-green" : "bg-red"
        }`}
      />
      {config.RateLimit && <RateLimiter limiter={config.RateLimit} />}
      <Routes routes={config.Routes} />
    </div>
  );
};

export default Proxy;
