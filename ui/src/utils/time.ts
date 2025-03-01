export const generateHourlyTimestamps = (): string[] => {
  const timestamps: string[] = [];
  const now = new Date();

  for (let i = 0; i < 24; i++) {
    const date = new Date(now);
    date.setHours(now.getHours() + i, 0, 0, 0); // Ajustamos la hora y ponemos minutos y segundos en 00
    timestamps.push(date.toISOString().slice(0, 19)); // Extraemos solo la parte YYYY-MM-DDTHH:MM:SS
  }

  return timestamps;
};
