import { UserMenu } from "@/components/layout/user-menu";
import { ThemeSwitcher } from "@/components/theme/theme-switcher";
import Link from "next/link";

type Props = {
  title?: string;
  isHome?: boolean;
};

export const AppNavigation: React.FC<Props> = () => {
  return (
    <div className="flex py-2 px-8 border-b sticky justify-between top-0 backdrop-blur bg-background/90 supports-[backdrop-filter]:bg-background/30 z-50">
      <Link href="/">
        <div>
          <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-3xl">
            Rezerwacje
          </h1>
        </div>
      </Link>
      <div className="flex gap-4">
        <ThemeSwitcher />
        <UserMenu />
      </div>
    </div>
  );
};
