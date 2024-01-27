"use server";
import { getServerSessionWithConfig } from "@/lib/auth/get-server-session-with-config";
import { GuildModel } from "@/models/guild";

export async function fetchGuilds(data: string[]): Promise<string> {
  try {
    const session = await getServerSessionWithConfig();

    if (!session) {
      throw new Error("No session");
    }

    const guilds = await GuildModel.find({ guildId: { $in: data } }).lean();

    return JSON.stringify(guilds);
  } catch (error) {
    throw error;
  }
}
