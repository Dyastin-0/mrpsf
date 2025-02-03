export const parseJSON = (log) => {
  try {
    return JSON.parse(log);
  } catch (e) {
    return { error: "Invalid log format" };
  }
};
