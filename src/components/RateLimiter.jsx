import TruncatedText from "./ui/TruncatedText";

const RateLimiter = ({ limiter }) => {
  return (
    <>
      <h3 className="font-semibold text-xs">Limiter Configuration</h3>
      <div className="flex flex-col">
        <TruncatedText
          text={
            <div>
              <span className="text-xs"> Rate </span>
              <span className="text-primary-highlight font-semibold">
                {limiter.Rate}
              </span>
            </div>
          }
          className="text-xs"
        />
        <TruncatedText
          text={
            <div>
              <span className="text-xs">Burst </span>
              <span className="text-primary-highlight font-semibold">
                {limiter.Burst}
              </span>
            </div>
          }
          className="text-xs"
        />
        <TruncatedText
          text={
            <div>
              <span className="text-xs">Cooldown </span>
              <span className="text-primary-highlight font-semibold">
                {limiter.Cooldown / 1000 / 60}m
              </span>
            </div>
          }
          className="text-xs"
        />
      </div>
    </>
  );
};

export default RateLimiter;
