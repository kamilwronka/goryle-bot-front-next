"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { Inter as FontSans } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme/theme-provider";

import "@/styles/globals.css";
import { AddReservationButton } from "@/components/common/add-reservation-button";
import { Toaster } from "@/components/ui/sonner";
import { SessionProvider } from "next-auth/react";
import { GlobalContextProvider } from "@/contexts/global-context";
import { ReservationModal } from "@/components/common/reservation-modal";
import { GuildModal } from "@/components/common/guild-modal";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const queryClient = new QueryClient();

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
        <Analytics />
        <SpeedInsights />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SessionProvider>
            <QueryClientProvider client={queryClient}>
              <GlobalContextProvider>
                {children}
                <AddReservationButton />
                <Toaster />
                <ReservationModal />
                <GuildModal />
              </GlobalContextProvider>
              <ReactQueryDevtools />
            </QueryClientProvider>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
