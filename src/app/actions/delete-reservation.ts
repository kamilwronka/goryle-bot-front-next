"use server";

import { getServerSessionWithConfig } from "@/lib/get-server-session-with-config";
import mongoClient from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function deleteReservation(id: string): Promise<string> {
  try {
    const session = await getServerSessionWithConfig();

    if (!session) {
      throw new Error("No session");
    }

    const client = await mongoClient;
    const db = await client.db("goryle-bot");
    const collection = await db.collection("expreservations");

    const result = await collection.deleteOne({
      _id: new ObjectId(id),
      userId: session?.user?.id,
    });

    return JSON.stringify(result);
  } catch (error) {
    throw error;
  }
}
