import { MainPage as MainPageFeature } from "@/features/main-page/main-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Exp rezerwator 3000",
  description: "Home",
};

export default async function MainPage() {
  return <MainPageFeature />;
}
