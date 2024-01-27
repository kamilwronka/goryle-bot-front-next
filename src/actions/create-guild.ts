"use server";

import connectDB from "@/lib/db/mongo";
import { getServerSessionWithConfig } from "@/lib/auth/get-server-session-with-config";
import { fetchUserGuilds } from "@/lib/discord/fetch-user-guilds";
import { Guild, GuildModel } from "@/models/guild";

// const eligibleRoles = [
//   "1150473111062454524",
//   "1150176778204233901",
//   "1150181160408862750",
// ];

export async function createGuild(data: Omit<Guild, "_id">): Promise<string> {
  try {
    const session = await getServerSessionWithConfig();

    if (!session) {
      throw new Error("No session");
    }

    const guilds = await fetchUserGuilds({ eligible: false });
    const isOwner = guilds.find(
      (guild) => guild.owner === true && guild.id === data.guildId
    );

    if (!isOwner) throw new Error("Not owner");

    await connectDB();

    const guild = new GuildModel<Omit<Guild, "_id">>({
      roleId: data.roleId,
      guildId: data.guildId,
    });

    const result = await guild.save();

    return JSON.stringify(result);
  } catch (error) {
    throw error;
  }
}
