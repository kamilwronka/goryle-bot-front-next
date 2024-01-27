"use server";

import { fetchGuilds } from "@/actions/fetch-guilds";
import { getServerSessionWithConfig } from "@/lib/auth/get-server-session-with-config";
import { Guild } from "@/models/guild";
import { REST } from "@discordjs/rest";
import { Routes, APIGuild } from "discord-api-types/v10";

export const fetchUserGuilds = async ({
  eligible = false,
}: {
  eligible?: boolean;
}): Promise<APIGuild[]> => {
  const session = await getServerSessionWithConfig();

  if (!session) {
    return [];
  }

  const rest = new REST({ version: "10", authPrefix: "Bearer" }).setToken(
    session?.accessToken as string
  );

  try {
    const response = (await rest.get(Routes.userGuilds())) as APIGuild[];

    if (!eligible) return response;

    const eligibleGuilds = JSON.parse(
      await fetchGuilds(response.map((guild) => guild.id))
    ) as Guild[];

    const mappedGuilds = response.filter((guild: APIGuild) => {
      return !!eligibleGuilds.find(
        (eligibleGuild) => eligibleGuild.guildId === guild.id
      );
    });

    return mappedGuilds;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch user guilds");
  }
};
