"use server";

import { EXP_SORT_ORDER } from "@/app/config/exp-sort-order";
import mongoClient from "@/lib/mongodb";
import { parseTimestampToDate } from "@/lib/parse-timestamp-to-date";
import { groupBy } from "lodash";

export type Reservation = {
  _id: string;
  exp: string;
  guildId: string;
  userId: string;
  objective: string;
  createdAt: number;
  dateFrom: number;
  dateTo: number;
  username?: string;
};

export async function fetchReservationsData(
  id: string,
  exp?: string
): Promise<string> {
  try {
    const client = await mongoClient;
    const now = Date.now();

    const desiredDate = now - 1000 * 60 * 60 * 3;

    const db = await client.db("goryle-bot");
    const collection = await db.collection("expreservations");
    const result = (await collection
      .find({
        guildId: id,
        dateFrom: { $gte: desiredDate },
        ...(exp ? { exp } : {}),
      })
      .sort({ dateFrom: 1 })
      .toArray()) as unknown as Reservation[];

    const parsedResult = result.map((reservation) => {
      const id = reservation._id.toString();
      const from = parseTimestampToDate(reservation.dateFrom);
      const to = parseTimestampToDate(reservation.dateTo);

      return {
        ...reservation,
        _id: id,
        dateFrom: from,
        dateTo: to,
      };
    });

    const sortedReservations = parsedResult.sort(
      (a, b) => EXP_SORT_ORDER.indexOf(a.exp) - EXP_SORT_ORDER.indexOf(b.exp)
    );
    const groups = groupBy(sortedReservations, "exp");

    return JSON.stringify(groups);
  } catch (error) {
    throw error;
  }
}
