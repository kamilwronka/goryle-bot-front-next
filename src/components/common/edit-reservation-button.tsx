import { ButtonWithTooltip } from "@/components/ui/button-with-tooltip";
import { Edit } from "lucide-react";

type Props = {
  id: string;
};

export const EditReservationButton: React.FC<Props> = ({ id }) => {
  return (
    <ButtonWithTooltip
      variant="outline"
      size="icon"
      tooltipDelay={100}
      tooltipContent="Edytuj"
      // onClick={() => open({ mode: "edit", id })}
    >
      <Edit className="w-4 h-4" />
    </ButtonWithTooltip>
  );
};
