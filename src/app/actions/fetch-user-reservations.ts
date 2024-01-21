"use server";

import { getServerSessionWithConfig } from "@/lib/get-server-session-with-config";
import mongoClient from "@/lib/mongodb";
import { parseTimestampToDate } from "@/lib/parse-timestamp-to-date";

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

export async function fetchUserReservations(
  id: string,
  exp?: string
): Promise<Reservation[]> {
  const session = await getServerSessionWithConfig();

  if (!session) {
    return [];
  }

  try {
    const client = await mongoClient;
    const now = Date.now();

    const desiredDate = now - 1000 * 60 * 60 * 3;

    const db = await client.db("goryle-bot");
    const collection = await db.collection("expreservations");
    const result = (await collection
      .find({
        userId: id,
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

    return parsedResult as unknown as Reservation[];
    // return result;
  } catch (error) {
    throw error;
  }
}
