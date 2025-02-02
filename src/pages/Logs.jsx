import clsx from "clsx";
import Proxy from "../components/Proxy";
import useLogs from "../hooks/useLogs";

const Logs = () => {
  const { logs } = useLogs();

  return (
    <div
      className="flex w-[calc(100%-.75rem)] h-[calc(100%-.75rem)] justify-center bg-primary rounded-md p-3
      mr-3 mb-3 overflow-y-auto"
    >
      <div className="flex flex-col w-full h-fit gap-3">
        {logs.length > 0 &&
          logs.map((log, index) => {
            const parsedLog = safelyParseJSON(log);
            return <FormattedLog key={index} log={parsedLog} />;
          })}
      </div>
    </div>
  );
};

const FormattedLog = ({ log }) => {
  return (
    <div className="flex gap-2 text-sm font-semibold text-primary-foreground">
      {Object.entries(log).map(([key, value], index) => {
        const fieldClass = getFieldClass(key, value);
        return (
          <span key={index} className="inline-block font-mono">
            <span className={clsx(fieldClass.key)}>{key}=</span>
            <span className={fieldClass.value}>{value}</span>{" "}
          </span>
        );
      })}
    </div>
  );
};

const colorMap = {
  error: "text-red",
  info: "text-primary-color",
  warn: "text-yellow-600",
  message: "text-yellow-700",
  200: "text-green",
  404: "text-red",
};

const getFieldClass = (key, value) => {
  return {
    key: colorMap[key] || "text-blue-600",
    value: colorMap[value],
  };
};

// Safe JSON parser to handle errors gracefully
const safelyParseJSON = (log) => {
  try {
    return JSON.parse(log);
  } catch (error) {
    console.error("Invalid JSON log:", log);
    return { error: "Invalid log format" }; // Return a placeholder if parsing fails
  }
};

export default Logs;
