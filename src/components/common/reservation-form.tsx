"use client";

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

import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
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
import { Reservation } from "@/models/reservation";
import { useCreateReservation } from "@/hooks/api/use-create-reservation";
import { useEligibleGuilds } from "@/hooks/api/use-eligible-guilds";
import { useToast } from "@/components/ui/use-toast";
import { useGlobalContext } from "@/hooks/use-global-context";
import { parseTimestampToDateAndTime } from "@/lib/date/utils";

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
  const { mutate: reservationMutate, isPending: reservationMutatePending } =
    useCreateReservation();
  const { data: eligibleGuilds } = useEligibleGuilds();
  const { toast } = useToast();
  const {
    reservationsModal: { state },
  } = useGlobalContext();

  const { date: dateFrom, time: timeFrom } = parseTimestampToDateAndTime(
    state.reservation?.dateFrom
  );
  const { date: dateTo, time: timeTo } = parseTimestampToDateAndTime(
    state.reservation?.dateTo
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: {
        from: dateFrom,
        to: dateTo,
      },
      timeFrom: timeFrom,
      timeTo: timeTo,
      purpose: state.reservation?.purpose || "",
      guildId: state.reservation?.guildId || "",
      exp: state.reservation?.exp || "",
    },
  });

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

    reservationMutate(payload as Reservation, {
      onSuccess: () => {
        onCancel();
        toast({
          title: "Dodano rezerwację",
          variant: "default",
        });
      },
    });
  }

  const mappedGuilds =
    eligibleGuilds?.map((item) => ({
      label: item.name,
      value: item.id,
    })) || [];

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
                          ? mappedGuilds.find(
                              (item) => item.value === field.value
                            )?.label
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
                        {mappedGuilds.map((item) => (
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
            {state.mode === "edit" && <Button type="submit">Edytuj</Button>}
            {state.mode === "create" && (
              <Button disabled={reservationMutatePending} type="submit">
                {reservationMutatePending && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Zarezerwuj
              </Button>
            )}
          </div>
        </form>
      </div>
    </Form>
  );
};
