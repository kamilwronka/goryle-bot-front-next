import { format } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";

export const parseTimestampToDate = (date: number) => {
  const utcDate = utcToZonedTime(date, "Etc/UTC");

  return format(utcDate, "dd.MM.yyyy - HH:mm");
};
