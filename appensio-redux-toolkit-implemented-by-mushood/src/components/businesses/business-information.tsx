import { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { ChartCircle } from "iconsax-react";
import { useForm } from "react-hook-form";
import { type Country } from "react-phone-number-input";
import { toast } from "sonner";
import { z } from "zod";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fetchCountryFromIP } from "@/lib/utils";
import { usePostBusinessInfoMutation } from "@/store/services/business";

import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { PhoneInput } from "../ui/phone-input";

const BusinessSetupSchema = z.object({
  businessName: z
    .string()
    .min(1, { message: "Business Name is required." })
    .max(100, { message: "Business Name must be at most 100 characters." })
    .regex(/^[A-Za-z0-9 ]+$/, { message: "No special characters allowed." }),
  industryType: z.string().nonempty({ message: "Industry Type is required." }),
  contactNumber: z
    .string()
    .regex(/^\+\d{1,4}\s?\(?\d{1,4}\)?[\s.-]?\d{1,4}[\s.-]?\d{1,9}$/, {
      message: "Invalid international phone format.",
    })
    .refine((val) => (val.match(/\d/g) ?? []).length >= 7, {
      message: "Phone number must contain at least 7 digits.",
    }),
  website: z.string().url({ message: "Invalid URL format." }),
  address: z.string().min(1, { message: "Address is required." }),
  language: z.string().nonempty({ message: "Language selection is required." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
});

const BusinessInformation = ({
  activeTab,
  handleDecrement,
  handleIncrement,
}: BusinessStepperFormProps) => {
  const [countryCode, setCountryCode] = useState<string | null>(null);
  const [addBusinessInfo, { isLoading }] = usePostBusinessInfoMutation();

  const form = useForm<z.infer<typeof BusinessSetupSchema>>({
    resolver: zodResolver(BusinessSetupSchema),
  });

  const handleSubmit = async (values: z.infer<typeof BusinessSetupSchema>) => {
    const response = await addBusinessInfo({
      business_name: values.businessName,
      contact_number: values.contactNumber,
      country: values.address,
      email: values.email,
      industry: values.industryType,
      language: values.language,
      website: values.website,
    });

    if (response.data) {
      toast.success("Successfully Added Business Information!");
      handleIncrement();
    } else {
      toast.error("Failed to Add Business Information!");
    }
  };

  useEffect(() => {
    void fetchCountryFromIP(setCountryCode);
  }, []);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex w-full flex-col items-start justify-start gap-5 overflow-y-auto md:h-[772px] md:gap-5"
      >
        <div className="flex w-full items-center justify-center gap-5 border-b border-[#D9D9D9] pb-5">
          <span className="flex-1 text-left text-[24px] leading-[24px] font-bold">
            Agent Information
          </span>
        </div>
        <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2">
          <FormField
            control={form.control}
            name="businessName"
            render={({ field }) => (
              <FormItem>
                <Label htmlFor="businessName" className="w-full text-left">
                  Agent Name<span className="text-destructive">*</span>
                </Label>
                <FormControl>
                  <Input
                    placeholder="Please enter a business name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="industryType"
            render={({ field }) => (
              <FormItem>
                <Label htmlFor="industryType" className="w-full text-left">
                  Industry Type
                </Label>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl className="w-full">
                    <SelectTrigger>
                      <SelectValue placeholder="Select Industry Type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {[
                      "Technology",
                      "Food",
                      "Healthcare",
                      "Real Estate",
                      "Software",
                    ].map((item, idx) => (
                      <SelectItem key={idx} value={item}>
                        {item}
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
            name="contactNumber"
            render={({ field }) => (
              <FormItem>
                <Label htmlFor="contactNumber" className="w-full text-left">
                  Contact Number<span className="text-destructive">*</span>
                </Label>
                <FormControl>
                  <PhoneInput
                    className="w-full"
                    defaultCountry={countryCode as Country}
                    placeholder="Enter Phone Number"
                    {...field}
                    international
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <Label htmlFor="Website" className="w-full text-left">
                  Website
                </Label>
                <FormControl>
                  <Input placeholder="Please enter a website" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
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
                      "United States of America",
                      "Canada",
                      "United Kingdom",
                      "Australia",
                      "Pakistan",
                    ].map((item, idx) => (
                      <SelectItem key={idx} value={item}>
                        {item}
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
            name="language"
            render={({ field }) => (
              <FormItem>
                <Label htmlFor="primaryLanguage" className="w-full text-left">
                  Primary Language<span className="text-destructive">*</span>
                </Label>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl className="w-full">
                    <SelectTrigger>
                      <SelectValue placeholder="Select Language" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {[
                      {
                        name: "English",
                        value: "en-US",
                      },
                      {
                        name: "French",
                        value: "FR",
                      },
                      {
                        name: "Arabic",
                        value: "AR",
                      },
                      {
                        name: "Japanese",
                        value: "JP",
                      },
                      {
                        name: "Urdu",
                        value: "UR",
                      },
                    ].map((item, idx) => (
                      <SelectItem key={idx} value={item.value}>
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <Label htmlFor="Email" className="w-full text-left">
                  Email
                </Label>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Please enter a business email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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

export default BusinessInformation;
