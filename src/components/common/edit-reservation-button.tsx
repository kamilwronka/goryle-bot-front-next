"use client";

import { ButtonWithTooltip } from "@/components/ui/button-with-tooltip";
import { useGlobalContext } from "@/hooks/use-global-context";
import { Reservation } from "@/models/reservation";
import { Edit } from "lucide-react";

type Props = {
  data: Reservation;
};

export const EditReservationButton: React.FC<Props> = ({ data }) => {
  const {
    reservationsModal: { dispatch },
  } = useGlobalContext();

  const handleModalOpen = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    dispatch({ type: "OPEN_EDIT", payload: data });
  };

  return (
    <ButtonWithTooltip
      variant="outline"
      size="icon"
      tooltipDelay={100}
      tooltipContent="Edytuj"
      onClick={handleModalOpen}
    >
      <Edit className="w-4 h-4" />
    </ButtonWithTooltip>
  );
};
