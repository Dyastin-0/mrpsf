import Proxy from "../components/Proxy";
import useDomains from "../hooks/useDomains";

const Proxies = () => {
  const { domains } = useDomains();

  return (
    <div className="flex w-full h-full justify-center bg-primary rounded-md p-3">
      <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 w-full h-fit gap-3">
        {domains &&
          Object.entries(domains).map(([domain, config]) => (
            <Proxy key={domain} domain={domain} config={config} />
          ))}
      </div>
    </div>
  );
};

export default Proxies;
