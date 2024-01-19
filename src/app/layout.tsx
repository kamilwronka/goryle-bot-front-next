import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { AppNavigation } from "@/components/layout/app-navigation";

import "@/styles/globals.css";
import { AddReservationButton } from "@/components/layout/add-reservation-button";
import { Toaster } from "@/components/ui/sonner";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <AddReservationButton />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
