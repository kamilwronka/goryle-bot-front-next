import { metadata } from "@/app/guilds/[id]/exp/[exp]/page";
import { AppNavigation } from "@/components/layout/app-navigation";
import { GuildReservations } from "@/features/reservations-page/components/guild-reservations";

type Props = {
  id: string;
  exp: string;
};

export const ReservationsPage: React.FC<Props> = ({ id, exp }) => {
  return (
    <main>
      <AppNavigation title={metadata.title as string} />
      <div className="flex items-center justify-center w-full">
        <GuildReservations id={id} exp={exp} />
      </div>
    </main>
  );
};
