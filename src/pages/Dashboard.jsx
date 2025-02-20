import Domain from "../components/Domain";
import useDomains from "../hooks/useDomains";

const Dashboard = () => {
  const { domains } = useDomains();

  return (
    <div
      className="flex w-[calc(100%-.75rem)] h-[calc(100%-.75rem)] justify-center bg-primary rounded-md p-3
      mr-3 mb-3"
    >
      <div className="grid lg:grid-cols-3 md:grid-cols-3 grid-cols-1 w-full h-fit gap-3">
        {domains &&
          Object.entries(domains).map(([domain, config]) => (
            <Domain key={domain} domain={domain} config={config} />
          ))}
      </div>
    </div>
  );
};

export default Dashboard;
