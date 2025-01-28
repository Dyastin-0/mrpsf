import Checkbox from "../ui/Checkbox";

const Selector = ({ items, selectedItems, setSelectedItems }) => {
  const handleCheckboxChange = (genre) => {
    setSelectedItems((prev) =>
      prev.includes(genre)
        ? prev.filter((item) => item !== genre)
        : [...prev, genre]
    );
  };

  return (
    <div className="flex flex-wrap justify-center gap-2 p-1">
      {items.map((item, index) => (
        <Checkbox
          key={index}
          name={item}
          value={selectedItems.includes(item)}
          onChecked={(e) => {
            e.preventDefault();
            handleCheckboxChange(item);
          }}
        />
      ))}
    </div>
  );
};

export default Selector;
