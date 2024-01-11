"use server";

import { EXP_SORT_ORDER } from "@/app/config/exp-sort-order";
import mongoClient from "@/lib/mongodb";
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

    const sortedReservations = result.sort(
      (a, b) => EXP_SORT_ORDER.indexOf(a.exp) - EXP_SORT_ORDER.indexOf(b.exp)
    );
    const groups = groupBy(sortedReservations, "exp");

    return JSON.stringify(groups);
  } catch (error) {
    throw error;
  }
}
