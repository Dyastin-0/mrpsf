export const parseJSON = (log) => {
  try {
    return JSON.parse(log);
  } catch (error) {
    console.log(log);
    console.error("Invalid JSON log:", error);
    return { error: "Invalid log format" };
  }
};
