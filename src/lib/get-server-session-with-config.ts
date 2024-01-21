import { authOptions } from "@/app/config/auth-options";
import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import { getServerSession } from "next-auth";

export type CustomSession = {
  user: {
    id: string;
    name: string;
    email: string;
    image: string;
  };
  accessToken: string;
};

// Use it in server contexts
export function getServerSessionWithConfig(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
): Promise<CustomSession | null> {
  return getServerSession(...args, authOptions);
}
