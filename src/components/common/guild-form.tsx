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

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEligibleGuilds } from "@/hooks/api/use-eligible-guilds";

type Props = {
  onCancel: () => void;
};

const formSchema = z.object({
  guildId: z.string({ required_error: "Wybierz serwer" }),
  roleId: z.string({ required_error: "Podaj ID roli" }).min(2),
});

export const GuildForm: React.FC<Props> = ({ onCancel }) => {
  const { data: eligibleGuilds } = useEligibleGuilds();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      roleId: "",
    },
  });

  async function onSubmit({ roleId, guildId }: z.infer<typeof formSchema>) {
    console.log(roleId, guildId);
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
                      <ScrollArea className="max-h-96">
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
                      </ScrollArea>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="roleId"
            render={({ field }) => (
              <FormItem className="space-y-3 w-full max-w-96">
                <FormLabel>ID roli, która może dodawać rezerwacje</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="123456" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-row justify-end gap-4">
            <Button variant="outline" type="button" onClick={onCancel}>
              Anuluj
            </Button>
            <Button type="submit">Dodaj</Button>
          </div>
        </form>
      </div>
    </Form>
  );
};
