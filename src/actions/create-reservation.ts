"use server";

import connectDB from "@/lib/db/mongo";
import { getServerSessionWithConfig } from "@/lib/auth/get-server-session-with-config";
import { Reservation, ReservationModel } from "@/models/reservation";
import { fetchGuildMember } from "@/lib/discord/fetch-guild-member";

const eligibleRoles = [
  "1150473111062454524",
  "1150176778204233901",
  "1150181160408862750",
  "1198939637402579004",
];

export async function createReservation(
  data: Omit<Reservation, "_id">
): Promise<string> {
  try {
    const session = await getServerSessionWithConfig();

    if (!session) {
      throw new Error("No session");
    }

    const guildMember = await fetchGuildMember(data.guildId);
    const desiredRole = guildMember.roles.find((role) => {
      return eligibleRoles.includes(role);
    });

    if (!desiredRole) throw new Error("No role");

    await connectDB();

    const reservation = new ReservationModel<Omit<Reservation, "_id">>({
      userId: session?.user?.id,
      guildId: data.guildId,
      exp: data.exp,
      dateFrom: data.dateFrom,
      dateTo: data.dateTo,
      purpose: data.purpose,
      username:
        guildMember.nick ||
        guildMember.user?.global_name ||
        guildMember.user?.username ||
        "Unknown",
    });

    const result = await reservation.save();

    return JSON.stringify(result);
  } catch (error) {
    throw error;
  }
}
