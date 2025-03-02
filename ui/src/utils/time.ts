export const generateHourlyTimestamps = (): string[] => {
  const timestamps: string[] = [];
  const now = new Date();

  for (let i = 0; i < 24; i++) {
    const date = new Date(now);
    date.setHours(now.getHours() + i, 0, 0, 0);
    timestamps.push(date.toISOString().slice(0, 19));
  }

  return timestamps;
};

export const getFormattedDateTime = (date: string): string => {
  const formatter = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  return formatter.format(new Date(date));
};
