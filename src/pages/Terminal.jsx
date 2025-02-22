import XTerm from "../components/XTerm";

const Terminal = () => {
  return (
    <div className="flex w-full h-[calc(100%-3rem)] items-center justify-center bg-primary rounded-md">
      <XTerm />
    </div>
  );
};

export default Terminal;
