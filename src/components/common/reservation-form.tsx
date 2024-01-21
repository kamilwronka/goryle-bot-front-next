import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
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

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  exp: z.string(),
  // date: z.object({
  //   from: z.date(),
  //   to: z.date(),
  // }),
  date: {
    // @ts-ignore
    from: z.date(),
    to: z.date(),
  },
  purpose: z.string(),
});

const EXP = [
  { label: "Driady wysokie", value: "DRIADY_WYSOKIE" },
  { label: "Pustynia", value: "PUSTYNIA" },
  { label: "Katakumby", value: "KATY" },
];

export function ReservationForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        noValidate
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 mt-8 mb-8"
      >
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
                        ? EXP.find((item) => item.value === field.value)?.label
                        : "Wybierz expowisko"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-full max-w-96 p-0">
                  <Command>
                    <CommandInput placeholder="Szukaj..." />
                    <CommandEmpty>Nie znaleziono.</CommandEmpty>
                    <CommandGroup>
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
          name="from"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Data i godzina</FormLabel>
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
                    time
                    selected={field.value}
                    // disabled={(date) => {
                    //   console.log({
                    //     from: form.getValues().from,
                    //     to: form.getValues().to,
                    //   });
                    //   return date > new Date() || date < new Date("1900-01-01");
                    // }}
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
          name="purpose"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Cel</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-row space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0 w-1/2">
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
      </form>
    </Form>
  );
}
