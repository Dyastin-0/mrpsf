export const Dot = ({ value }) => {
  return (
    <span className={`rounded-full w-2 h-2 ${value ? "bg-green" : "bg-red"}`} />
  );
};
