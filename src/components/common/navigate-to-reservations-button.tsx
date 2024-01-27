"use client";

import { ButtonWithTooltip } from "@/components/ui/button-with-tooltip";
import { Reservation } from "@/models/reservation";
import { Navigation } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {
  reservation: Reservation;
};

export const NavigateToReservationsButton: React.FC<Props> = ({
  reservation,
}) => {
  const router = useRouter();

  const handleNavigate = (e: React.MouseEvent<HTMLButtonElement>) => {
    router.push(
      `/guilds/${reservation.guildId}/exp/${reservation.exp}#reservation-${reservation._id}`
    );
  };

  return (
    <ButtonWithTooltip
      variant="outline"
      size="icon"
      tooltipDelay={100}
      tooltipContent="Idź do rezerwacji"
      onClick={handleNavigate}
    >
      <Navigation className="w-4 h-4" />
    </ButtonWithTooltip>
  );
};
