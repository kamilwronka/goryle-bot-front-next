import { format } from "date-fns";

export const parseTimestampToDate = (date?: number) => {
  if (!date) {
    return "N/A";
  }

  return format(date, "dd.MM.yyyy - HH:mm");
};
