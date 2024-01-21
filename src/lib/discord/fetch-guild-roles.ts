import { getServerSessionWithConfig } from "@/lib/get-server-session-with-config";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v10";

export const fetchGuildRoles = async () => {
  const session = await getServerSessionWithConfig();

  if (!session) {
    return [];
  }

  const rest = new REST({ version: "10", authPrefix: "Bearer" }).setToken(
    session?.accessToken as string
  );

  try {
    return await rest.get(Routes.userGuildMember("1150166249976905828"));
  } catch (error) {
    console.error(error);
  }
};
