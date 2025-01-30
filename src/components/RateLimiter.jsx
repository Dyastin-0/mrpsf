import TruncatedText from "./ui/TruncatedText";

const RateLimiter = ({ limiter }) => {
  return (
    <>
      <h3 className="font-semibold text-xs">Limiter Configuration</h3>
      <div className="flex flex-col">
        <TruncatedText
          text={
            <div>
              <span>Rate </span>
              <span className="text-primary-highlight">{limiter.Rate}</span>
            </div>
          }
          className="text-xs"
        />
        <TruncatedText
          text={
            <div>
              <span>Burst </span>
              <span className="text-primary-highlight">{limiter.Burst}</span>
            </div>
          }
          className="text-xs"
        />
        <TruncatedText
          text={
            <div>
              <span>Cooldown </span>
              <span className="text-primary-highlight">{limiter.Cooldown}</span>
            </div>
          }
          className="text-xs"
        />
      </div>
    </>
  );
};

export default RateLimiter;
