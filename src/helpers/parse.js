export const parseJSON = (log) => {
  try {
    return JSON.parse(log);
  } catch (error) {
    console.error("Invalid JSON log:", log);
    return { error: "Invalid log format" };
  }
};
