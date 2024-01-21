import { Button, ButtonProps } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Props = {
  tooltipContent: React.ReactNode;
  tooltipDelay: number;
};

export const ButtonWithTooltip: React.FC<Props & ButtonProps> = ({
  tooltipContent,
  tooltipDelay,
  ...buttonProps
}) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={tooltipDelay}>
        <TooltipTrigger>
          <Button {...buttonProps} />
        </TooltipTrigger>
        <TooltipContent>{tooltipContent}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
