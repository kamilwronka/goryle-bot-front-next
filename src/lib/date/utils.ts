import { format } from "date-fns";

export const parseTimestampToDateAndTime = (
  timestamp?: number
): { date: Date | undefined; time: string } => {
  if (!timestamp) {
    return { date: undefined, time: "" };
  }

  const date = new Date(timestamp);
  const time = format(date, "HH:mm");

  return { date, time };
};
