import { Link } from "react-router-dom";

const MRPS = () => {
  return (
    <Link
      className="outline-none rounded-md
		transition-all durantion-300 focus:shadow-[var(--accent-secondary)_0_0_0_2px]"
      to="/"
    >
      <div className="flex justify-center items-center h-full font-semibold">
        <h1 className="text-sm text-primary-highlight">mr</h1>
        <h1 className="text-sm text-primary-foreground">ps</h1>
      </div>
    </Link>
  );
};

export default MRPS;
