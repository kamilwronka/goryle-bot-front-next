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
    const response = await rest.get(Routes.userGuildMember(guildId));
    return response as APIGuildMember;
  } catch (error) {
    console.log(JSON.stringify(error));
    throw new Error("Failed to fetch guild member from discord");
  }
};
