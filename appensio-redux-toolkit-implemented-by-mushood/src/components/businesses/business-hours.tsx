import { zodResolver } from "@hookform/resolvers/zod";
import { ChartCircle } from "iconsax-react";
import { useFieldArray, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { RootState } from "@/store";
import { usePostBusinessHoursMutation } from "@/store/services/business";

const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

const daySchema = z
  .object({
    dayName: z.enum([
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ]),
    status: z.enum(["open", "closed"]),
    opensAt: z
      .string()
      .regex(timeRegex, {
        message: "Invalid time format (HH:MM)",
      })
      .optional(),
    closesAt: z
      .string()
      .regex(timeRegex, {
        message: "Invalid time format (HH:MM)",
      })
      .optional(),
  })
  .refine((day) => day.status === "closed" || (day.opensAt && day.closesAt), {
    message: "Opening and closing times are required when status is open",
    path: ["opensAt"],
  });

const businessHoursSchema = z.object({
  operatingDays: z.boolean().optional(),
  days: z.array(daySchema).length(7),
});

const weekDays: z.infer<
  typeof businessHoursSchema
>["days"][number]["dayName"][] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const BusinessHours = ({
  activeTab,
  handleDecrement,
  handleIncrement,
}: BusinessStepperFormProps) => {
  const { business } = useSelector((state: RootState) => state.global);

  const form = useForm<z.infer<typeof businessHoursSchema>>({
    resolver: zodResolver(businessHoursSchema),
    defaultValues: {
      operatingDays: true,
      days: weekDays.map((day) => ({ dayName: day, status: "closed" })),
    },
  });

  const { fields } = useFieldArray({
    control: form.control,
    name: "days",
  });

  const [postHours, { isLoading }] = usePostBusinessHoursMutation();

  const isTemporarilyClosed = form.watch("operatingDays") === false;

  const onSubmit = async (values: z.infer<typeof businessHoursSchema>) => {
    const response = await postHours({
      business_id: business.id,
      data: {
        business_status: values.operatingDays!,
        data: values.days.map((day) => ({
          status: day.status === "open" ? "open" : "temporarily_closed",
          open: day.opensAt ?? "",
          close: day.closesAt ?? "",
          day: day.dayName,
        })),
      },
    });

    if (response.data) {
      toast.success("Successfully Updated Business Hours!");
      handleIncrement();
    } else {
      toast.error("Failed to Update Business Hours!");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col items-start justify-start gap-5 overflow-y-auto md:h-[772px] md:gap-5"
      >
        <div className="flex w-full items-center justify-center gap-5 border-b border-[#D9D9D9] pb-5">
          <span className="flex-1 text-left text-[24px] leading-[24px] font-bold">
            Operating Days
          </span>
        </div>
        <div className="grid w-full grid-cols-2 gap-5">
          <FormField
            control={form.control}
            name="operatingDays"
            render={({ field }) => (
              <FormItem className="col-span-1 w-full">
                <FormControl className="flex w-full items-center justify-between">
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={String(field.value)}
                  >
                    <FormItem className="flex items-center space-x-3">
                      <RadioGroupItem value="true" />
                      <FormLabel>Open with main hours</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3">
                      <RadioGroupItem value="false" />
                      <FormLabel>Temporarily closed</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="col-span-1" />
        </div>
        <fieldset disabled={isTemporarilyClosed} className="w-full">
          <div className="grid w-full grid-cols-2 items-start justify-start gap-5">
            {fields.map((field, index) => (
              <div key={field.id} className="rounded-md border p-4">
                <FormLabel>{field.dayName}</FormLabel>
                <FormField
                  control={form.control}
                  name={`days.${index}.status` as const}
                  render={({ field }) => (
                    <FormItem className="pt-5">
                      <FormControl className="flex w-full items-center justify-start gap-5">
                        <RadioGroup
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormItem className="flex items-center space-x-3">
                            <RadioGroupItem value="open" />
                            <FormLabel>Open</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3">
                            <RadioGroupItem value="closed" />
                            <FormLabel>Closed</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 items-start justify-start gap-4 pt-5">
                  <FormField
                    control={form.control}
                    name={`days.${index}.opensAt` as const}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Opens At</FormLabel>
                        <FormControl>
                          <Input
                            disabled={
                              form.watch(`days.${index}.status`) === "closed"
                            }
                            type="time"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`days.${index}.closesAt` as const}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Closes At</FormLabel>
                        <FormControl>
                          <Input
                            disabled={
                              form.watch(`days.${index}.status`) === "closed"
                            }
                            type="time"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            ))}
          </div>
        </fieldset>
        <div className="col-span-2 mt-auto flex w-full items-center justify-end gap-5">
          <Button
            onClick={handleDecrement}
            disabled={activeTab === "1"}
            type="button"
            variant="secondary"
          >
            Previous
          </Button>
          <Button disabled={isLoading} type="submit" variant="default">
            {isLoading ? (
              <ChartCircle size={20} color="#FFFFFF" className="animate-spin" />
            ) : (
              "Next"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default BusinessHours;
