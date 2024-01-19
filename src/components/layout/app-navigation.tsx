import { LoginButton } from "@/components/layout/login-button";
import { ThemeSwitcher } from "@/components/theme/theme-switcher";

type Props = {
  title?: string;
  isHome?: boolean;
};

export const AppNavigation: React.FC<Props> = ({ title, isHome = false }) => {
  return (
    <div className="flex py-2 px-8 border-b sticky justify-between top-0 backdrop-blur bg-background/90 supports-[backdrop-filter]:bg-background/30 z-50">
      <div>
        <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-3xl">
          {title}
        </h1>
      </div>
      <div className="flex gap-2">
        <ThemeSwitcher />
        <LoginButton />
      </div>
    </div>
  );
};
