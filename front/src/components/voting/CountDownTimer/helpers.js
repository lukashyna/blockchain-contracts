export const normalizedTime = (time) => {
  if (!time) return;
  return typeof time === "bigint" ? Number(time) * 1000 : time;
};

export const formatNumber = (num) => num.toString().padStart(2, "0");

export const calculateEndTime = (startTime, duration) => {
  if (!startTime || !duration) return;
  return new Date(startTime).getTime() + duration;
};
