import { AppNavigation } from "@/components/layout/app-navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description: "Home",
};

export default function Home() {
  return (
    <main>
      <AppNavigation title={metadata.title as string} />
      <section>test</section>
    </main>
  );
}
