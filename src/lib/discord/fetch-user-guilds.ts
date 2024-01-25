"use server";

import { ELIGIBLE_GUILDS } from "@/config/eligible-guilds";
import { getServerSessionWithConfig } from "@/lib/auth/get-server-session-with-config";
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

    const eligibleGuilds = response.filter((guild: APIGuild) => {
      return ELIGIBLE_GUILDS.includes(guild.id);
    });

    return eligibleGuilds;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch user guilds");
  }
};
