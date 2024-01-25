"use client";

import { Reservation } from "@/actions/fetch-reservations-data";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { parseTimestampToDate } from "@/lib/parse-timestamp-to-date";

type Props = {
  data: Reservation[];
  name: string;
};

export const Timetable: React.FC<Props> = ({ data, name }) => {
  const handleCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success(`Skopiowano ID rezerwacji ${id} do schowka`);
  };

  return (
    <Table className="border">
      <TableHeader>
        <TableRow className="bg-secondary">
          <TableHead className="w-36 min-w-24">Użytkownik</TableHead>
          <TableHead className="w-48 min-w-48">Od</TableHead>
          <TableHead className="w-48 min-w-48">Do</TableHead>
          <TableHead className="w-36 min-w-24">Cel</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((reservation) => {
          const id = reservation._id.toString();
          const from = parseTimestampToDate(reservation.dateFrom);
          const to = parseTimestampToDate(reservation.dateTo);

          return (
            <TableRow
              key={id}
              className="cursor-pointer"
              onClick={() => handleCopy(id)}
            >
              <TableCell>{reservation.username}</TableCell>
              <TableCell>{from}</TableCell>
              <TableCell>{to}</TableCell>
              <TableCell>{reservation.objective}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
