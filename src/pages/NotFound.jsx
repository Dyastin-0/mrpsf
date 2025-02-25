import clsx from "clsx";

const NotFound = () => {
  return (
    <div
      className={clsx(
        "flex justify-center items-center",
        "w-full h-[calc(100%-3rem)] flex flex-col p-4",
        "bg-primary rounded-md",
        "text-sm font-extrabold text-transparent",
        "from-primary-highlight to-secondary-highlight bg-clip-text",
        "bg-gradient-to-tr"
      )}
    >
      <div className={clsx()}>
        <p className="text-9xl font-extrabold">404</p>
        <p className="text-xl text-center">Page not found</p>
      </div>
    </div>
  );
};

export default NotFound;
