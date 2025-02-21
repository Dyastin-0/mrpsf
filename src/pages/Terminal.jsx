import XTerm from "../components/XTerm";

const Terminal = () => {
  return (
    <div
      className="flex w-[calc(100%-.75rem)] h-[calc(100%-.75rem)] justify-center bg-primary rounded-md p-3
			mr-3 mb-3"
    >
      <XTerm />
    </div>
  );
};

export default Terminal;
