import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { addDays, format, parse, set, setHours, subDays } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { MAXIMUM_NUMBER_OF_DAYS_AHEAD } from "@/config/reservations";
import { fetchUserGuilds } from "@/lib/discord/fetch-user-guilds";
import { useEffect, useState } from "react";
import { createReservation } from "@/actions/create-reservation";
import { Reservation } from "@/models/reservation";

type Props = {
  onCancel: () => void;
};

const formSchema = z.object({
  guildId: z.string({ required_error: "Wybierz serwer" }),
  exp: z.string({ required_error: "Wybierz expowisko" }),
  date: z.object(
    {
      from: z.date(),
      to: z.date(),
    },
    { required_error: "Wybierz datę" }
  ),
  timeFrom: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: "Niepoprawny format godziny",
  }),
  timeTo: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: "Niepoprawny format godziny",
  }),
  purpose: z.string({ required_error: "Wybierz cel" }),
});

const EXP = [
  { label: "Driady wysokie", value: "Driady wysokie" },
  { label: "Pustynia", value: "Pustynia" },
  { label: "Katakumby", value: "Katakumby" },
];

export const ReservationForm: React.FC<Props> = ({ onCancel }) => {
  const [guilds, setGuilds] = useState<{ label: string; value: string }[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      timeFrom: "",
      timeTo: "",
    },
  });

  useEffect(() => {
    fetchUserGuilds({ eligible: true }).then((guilds) => {
      const parsedGuilds = guilds.map((guild) => ({
        label: guild.name,
        value: guild.id,
      }));
      setGuilds(parsedGuilds);
    });
  }, []);

  async function onSubmit({
    date,
    timeFrom,
    timeTo,
    exp,
    purpose,
    guildId,
  }: z.infer<typeof formSchema>) {
    const [fromHour, fromMinutes] = timeFrom
      .split(":")
      .map((e) => parseInt(e, 10));
    const [toHour, toMinutes] = timeTo.split(":").map((e) => parseInt(e, 10));

    const dateWithTimeFrom = set(date.from, {
      hours: fromHour,
      minutes: fromMinutes,
    });
    const dateWithTimeTo = set(date.to, {
      hours: toHour,
      minutes: toMinutes,
    });

    const payload: Partial<Reservation> = {
      exp,
      dateFrom: dateWithTimeFrom.getTime(),
      dateTo: dateWithTimeTo.getTime(),
      purpose,
      guildId,
    };

    await createReservation(payload as Reservation);

    console.log(payload);
  }

  return (
    <Form {...form}>
      <div className="w-full flex flex-col items-center justify-center">
        <form
          noValidate
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 mt-8 w-full max-w-96"
        >
          <FormField
            control={form.control}
            name="guildId"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Server</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-full max-w-96 justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? guilds.find((item) => item.value === field.value)
                              ?.label
                          : "Wybierz server"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="popover-with-the-same-width-as-trigger p-0">
                    <Command className="w-full">
                      <CommandInput placeholder="Szukaj..." />
                      <CommandEmpty>Nie znaleziono.</CommandEmpty>
                      <CommandGroup className="w-full">
                        {guilds.map((item) => (
                          <CommandItem
                            value={item.label}
                            key={item.value}
                            onSelect={() => {
                              form.setValue("guildId", item.value);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                item.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {item.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="exp"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Expowisko</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-full max-w-96 justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? EXP.find((item) => item.value === field.value)
                              ?.label
                          : "Wybierz expowisko"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="popover-with-the-same-width-as-trigger p-0">
                    <Command className="w-full">
                      <CommandInput placeholder="Szukaj..." />
                      <CommandEmpty>Nie znaleziono.</CommandEmpty>
                      <CommandGroup className="w-full">
                        {EXP.map((item) => (
                          <CommandItem
                            value={item.label}
                            key={item.value}
                            onSelect={() => {
                              form.setValue("exp", item.value);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                item.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {item.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Data</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full max-w-96 pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value && field.value.from ? (
                          format(field.value.from, "dd.MM.yyyy")
                        ) : (
                          <span>Wybierz datę</span>
                        )}
                        &nbsp; - &nbsp;
                        {field.value && field.value.to ? (
                          format(field.value.to, "dd.MM.yyyy")
                        ) : (
                          <span>Wybierz datę</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="range"
                      selected={field.value}
                      disabled={(date) => {
                        const currentDate = new Date();
                        return (
                          date < subDays(currentDate, 1) ||
                          date >
                            addDays(currentDate, MAXIMUM_NUMBER_OF_DAYS_AHEAD)
                        );
                      }}
                      onSelect={field.onChange}
                      numberOfMonths={1}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="timeFrom"
            render={({ field }) => (
              <FormItem className="space-y-3 w-full max-w-96">
                <FormLabel>Godzina od</FormLabel>
                <FormControl>
                  <Input type="time" placeholder="12:30" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="timeTo"
            render={({ field }) => (
              <FormItem className="space-y-3 w-full max-w-96">
                <FormLabel>Godzina do</FormLabel>
                <FormControl>
                  <Input type="time" placeholder="13:30" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="purpose"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Cel</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="exp" />
                      </FormControl>
                      <FormLabel className="font-normal">Exp</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="farma" />
                      </FormControl>
                      <FormLabel className="font-normal">Farma</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-row justify-end gap-4">
            <Button variant="outline" type="button" onClick={onCancel}>
              Anuluj
            </Button>
            <Button type="submit">Zarezerwuj</Button>
          </div>
        </form>
      </div>
    </Form>
  );
};
