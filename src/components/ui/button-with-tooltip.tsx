import { Button, ButtonProps } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { forwardRef } from "react";

type Props = {
  tooltipContent: React.ReactNode;
  tooltipDelay: number;
};

export const ButtonWithTooltip = forwardRef<
  HTMLButtonElement,
  ButtonProps & Props
>(({ tooltipContent, tooltipDelay, ...buttonProps }, ref) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={tooltipDelay}>
        <TooltipTrigger asChild>
          <Button {...buttonProps} />
        </TooltipTrigger>
        <TooltipContent>{tooltipContent}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
});

ButtonWithTooltip.displayName = "ButtonWithTooltip";
