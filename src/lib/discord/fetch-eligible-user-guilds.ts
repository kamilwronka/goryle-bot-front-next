import { ELIGIBLE_GUILDS } from "@/app/config/eligible-guilds";
import { getServerSessionWithConfig } from "@/lib/get-server-session-with-config";
import { REST } from "@discordjs/rest";
import { Routes, APIGuild } from "discord-api-types/v10";

export const fetchEligibleUserGuilds = async (): Promise<APIGuild[]> => {
  const session = await getServerSessionWithConfig();

  if (!session) {
    return [];
  }

  const rest = new REST({ version: "10", authPrefix: "Bearer" }).setToken(
    session?.accessToken as string
  );

  try {
    const response = (await rest.get(Routes.userGuilds())) as APIGuild[];
    const eligibleGuilds = response.filter((guild: APIGuild) => {
      return ELIGIBLE_GUILDS.includes(guild.id);
    });

    return eligibleGuilds;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch user guilds");
  }
};
