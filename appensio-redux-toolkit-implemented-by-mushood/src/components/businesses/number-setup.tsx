import { zodResolver } from "@hookform/resolvers/zod";
import { ChartCircle } from "iconsax-react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { z } from "zod";

import { type RootState } from "@/store";
import { useAssignTwilioNumberMutation } from "@/store/services/business";

import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const NumberSetupSchema = z.object({
  country: z.string().nonempty({ message: "Country selection is required." }),
  areaCode: z
    .string()
    .length(3, { message: "Enter a valid area code (3 digits)." })
    .optional(),
});

const NumberSetup = ({
  activeTab,
  handleDecrement,
  handleIncrement,
}: BusinessStepperFormProps) => {
  const [getTwilioNumber, { isLoading }] = useAssignTwilioNumberMutation();
  const { twilioNumber, business } = useSelector(
    (state: RootState) => state.global
  );

  const form = useForm<z.infer<typeof NumberSetupSchema>>({
    resolver: zodResolver(NumberSetupSchema),
  });

  const handleSubmit = async (values: z.infer<typeof NumberSetupSchema>) => {
    await getTwilioNumber({
      business_id: business.id,
      country_code: values.country,
      area_code: `${values.areaCode}`,
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex w-full flex-col items-start justify-start gap-5 overflow-y-auto md:h-[772px] md:gap-5"
      >
        <div className="flex w-full items-center justify-center gap-5 border-b border-[#D9D9D9] pb-5">
          <span className="w-full text-left text-[24px] leading-[24px] font-bold">
            Number Set-up
          </span>
        </div>
        <div className="mr-auto flex w-full flex-col items-center justify-between gap-5 rounded-lg border border-[#0B33A44D] bg-[#0B33A41A] p-7 md:w-1/2">
          <span className="w-full text-left text-[18px] leading-[18px] font-bold">
            {business.name}
          </span>
          <span className="w-full text-left text-[16px] leading-[16px] font-normal text-[#71717A]">
            {business.industry} | {business.country}
          </span>
        </div>
        <span className="w-full text-left text-[24px] leading-[24px] font-bold">
          Generate Twilio Number
        </span>
        <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2">
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <Label htmlFor="country" className="w-full text-left">
                  Country
                </Label>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl className="w-full">
                    <SelectTrigger>
                      <SelectValue placeholder="Select Country" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {[
                      {
                        name: "United States of America",
                        code: "US",
                      },
                      {
                        name: "Canada",
                        code: "CD",
                      },
                      {
                        name: "Australia",
                        code: "AU",
                      },
                      {
                        name: "United Kingdom",
                        code: "GB",
                      },
                      {
                        name: "Pakistan",
                        code: "PK",
                      },
                    ].map((item, idx) => (
                      <SelectItem key={idx} value={item.code}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="areaCode"
            render={({ field }) => (
              <FormItem>
                <Label htmlFor="Area Code" className="w-full text-left">
                  Area Code
                </Label>
                <FormControl>
                  <Input placeholder="415" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="mx-auto flex w-full flex-col items-center justify-between gap-5 rounded-lg border border-[#0B33A44D] bg-[#0B33A41A] p-7 md:w-2/3 lg:w-1/2">
          <span className="w-full text-center text-[24px] leading-[24px] font-bold">
            Generate Number
          </span>
          {twilioNumber && (
            <span className="w-full text-center text-[40px] leading-[40px] font-bold">
              {twilioNumber}
            </span>
          )}
          <span className="w-full max-w-prose text-center text-[16px] leading-[20px] font-normal text-pretty text-[#71717A]">
            Generate a unique Twilio number for your
            <br className="hidden md:flex" />
            &nbsp;business
          </span>
          <Button disabled={isLoading} type="submit" variant="default">
            {isLoading ? (
              <ChartCircle size={20} color="#FFFFFF" className="animate-spin" />
            ) : twilioNumber ? (
              "Regenerate"
            ) : (
              "Generate"
            )}
          </Button>
        </div>
        <div className="col-span-2 mt-auto flex w-full items-center justify-end gap-5">
          <Button
            onClick={handleDecrement}
            disabled={activeTab === "1"}
            type="button"
            variant="secondary"
          >
            Previous
          </Button>
          <Button onClick={handleIncrement} type="button" variant="default">
            Next
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default NumberSetup;
