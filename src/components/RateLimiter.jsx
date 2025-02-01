import TruncatedText from "./ui/TruncatedText";

const RateLimiter = ({ limiter }) => {
  return (
    <>
      <h3 className="font-semibold text-sm">Limiter Configuration</h3>
      <div className="flex flex-col">
        <TruncatedText
          text={
            <div>
              <span>Rate </span>
              <span className="text-primary-highlight font-semibold">
                {limiter.Rate}
              </span>
            </div>
          }
          className="text-sm"
        />
        <TruncatedText
          text={
            <div>
              <span>Burst </span>
              <span className="text-primary-highlight font-semibold">
                {limiter.Burst}
              </span>
            </div>
          }
          className="text-sm"
        />
        <TruncatedText
          text={
            <div>
              <span>Cooldown </span>
              <span className="text-primary-highlight font-semibold">
                {limiter.Cooldown / 1000 / 60}m
              </span>
            </div>
          }
          className="text-sm"
        />
      </div>
    </>
  );
};

export default RateLimiter;
