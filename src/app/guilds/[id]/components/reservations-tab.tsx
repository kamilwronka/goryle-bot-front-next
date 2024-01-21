import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

type Props = {
  expKey: string;
  guildId: string;
};

export const ReservationsTab: React.FC<Props> = ({ expKey, guildId }) => {
  return (
    <Link href={`/guilds/${guildId}/exp/${expKey}`}>
      <Card className="w-96 flex justify-center py-4 hover:bg-secondary/70 bg-muted cursor-pointer transition">
        <CardHeader>
          <CardTitle>{expKey}</CardTitle>
        </CardHeader>
      </Card>
    </Link>
  );
};
