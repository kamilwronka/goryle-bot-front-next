import { getServerSessionWithConfig } from "@/lib/auth/get-server-session-with-config";
import { REST } from "@discordjs/rest";
import { APIGuildMember, Routes } from "discord-api-types/v10";

export const fetchGuildMember = async (
  guildId: string
): Promise<APIGuildMember> => {
  const session = await getServerSessionWithConfig();

  if (!session) {
    throw new Error("No session");
  }

  const rest = new REST({ version: "10", authPrefix: "Bearer" }).setToken(
    session?.accessToken as string
  );

  try {
    return (await rest.get(Routes.userGuildMember(guildId))) as APIGuildMember;
  } catch (error) {
    throw new Error("Failed to fetch user guilds");
  }
};
