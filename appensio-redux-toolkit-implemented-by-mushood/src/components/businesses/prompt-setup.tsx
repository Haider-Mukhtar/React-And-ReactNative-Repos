import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { ChartCircle, Copy, InfoCircle } from "iconsax-react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { z } from "zod";

import { cn, copyToClipboard } from "@/lib/utils";
import { type RootState } from "@/store";
import {
  useGetPromptTemplatesQuery,
  useUpdateBusinessPromptMutation,
} from "@/store/services/business";

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
import { Switch } from "../ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Textarea } from "../ui/textarea";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

const PromptSetupSchema = z.object({
  first_message: z.string(),
  last_message: z.string(),
  prompt: z
    .string()
    .min(50, { message: "Prompt must be at least 50 characters." })
    .max(15000, { message: "Prompt cannot exceed 15,000 characters." }),
  editPrivilege: z.boolean().optional(),
});

const PromptSetup = ({
  activeTab,
  handleDecrement,
  handleIncrement,
}: BusinessStepperFormProps) => {
  const [selected, setSelected] = useState<string>("1");
  const { data, isLoading: fetching } = useGetPromptTemplatesQuery({});
  const [createPrompt, { isLoading }] = useUpdateBusinessPromptMutation();
  const { vapiId, business } = useSelector((state: RootState) => state.global);

  const form = useForm<z.infer<typeof PromptSetupSchema>>({
    resolver: zodResolver(PromptSetupSchema),
  });

  const handleSubmit = async (values: z.infer<typeof PromptSetupSchema>) => {
    const response = await createPrompt({
      data: {
        vapi_id: vapiId,
        system_prompt: values.prompt,
        first_message: values.first_message,
        last_message: values.last_message,
        edit_privilege: values.editPrivilege ?? false,
      },
      business_id: business.id,
    });

    if (response.data) {
      toast.success("Successfully Setup Prompt!");
      handleIncrement();
    } else {
      toast.error("Failed to Setup Prompt!");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex w-full flex-col items-start justify-start gap-5 overflow-y-auto md:h-[772px] md:gap-5"
      >
        <div className="flex w-full items-center justify-center gap-5 border-b border-[#D9D9D9] pb-5">
          <span className="flex-1 text-left text-[24px] leading-[24px] font-bold">
            Prompt Set-up
          </span>
          <div className="flex items-center justify-center gap-3.5">
            <span className="text-sm font-semibold">Allow Update</span>
            <FormField
              control={form.control}
              name="editPrivilege"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex w-full flex-col items-center justify-center gap-5">
          <FormField
            control={form.control}
            name="first_message"
            render={({ field }) => (
              <FormItem className="w-full">
                <Label htmlFor="First Message" className="w-full text-left">
                  First Message
                </Label>
                <FormControl className="w-full">
                  <Input placeholder="Enter the First Message" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="last_message"
            render={({ field }) => (
              <FormItem className="w-full">
                <Label htmlFor="Away Message" className="w-full text-left">
                  Away Message
                </Label>
                <FormControl className="w-full">
                  <Input placeholder="Enter the Away Message" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="prompt"
            render={({ field }) => (
              <FormItem className="w-full">
                <div className="flex w-full items-center justify-start text-left text-[14px] leading-[14px] font-semibold">
                  Define Your Business Profile&nbsp;
                  <span className="text-destructive">*</span>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        type="button"
                        size="icon"
                        className="ml-2"
                      >
                        <InfoCircle size={20} color="#000000" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="bg-white">
                      <div className="mr-auto flex h-full w-full flex-col items-center justify-start gap-5 rounded-lg border border-[#0B33A4] p-5">
                        <span className="w-full text-left text-[18px] leading-[18px] font-bold text-black">
                          Prompt Guidelines
                        </span>
                        <ul className="flex w-full list-inside list-disc flex-col items-center justify-center gap-2 text-[#71717A]">
                          {[
                            "Define the AI's role and purpose",
                            "Specify tone and communication style",
                            "Include key business values",
                            "Provide context for responses",
                          ].map((item, idx) => (
                            <li
                              key={idx}
                              className="w-full text-left text-[14px] leading-[14px]"
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <FormControl>
                  <Textarea
                    className={cn(
                      "border-input h-56 w-full resize-none rounded-xl border p-5 shadow",
                      {
                        "border-destructive": prompt.length > 500,
                      }
                    )}
                    placeholder="Write a custom prompt that defines the behaviour and tone of your business."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <span className="w-full text-right text-[14px] leading-[14px] font-normal text-[#71717A]">
            {form.watch("prompt")?.length}/15000 Characters
          </span>
        </div>
        <div className="mr-auto flex w-full flex-col items-center justify-between gap-2.5 rounded-lg border border-[#0B33A44D] bg-[#0B33A41A] p-7">
          <div className="flex w-full items-center justify-center">
            <span className="flex-1 text-left text-[18px] leading-[18px] font-bold">
              Prompt Templates
            </span>
            <Button
              onClick={() =>
                copyToClipboard(
                  `${data?.find((prompt) => prompt.id === Number(selected))?.template.trim()}`
                )
              }
              type="button"
              variant="default"
              size="sm"
            >
              <Copy size={20} color="#FFFFFF" />
              Copy Template
            </Button>
          </div>
          {fetching ? (
            <div className="flex h-full w-full items-center justify-center">
              <ChartCircle size={40} color="#0B33A4" className="animate-spin" />
            </div>
          ) : (
            <Tabs
              value={selected}
              onValueChange={setSelected}
              className="h-full w-full"
            >
              <TabsList className="grid w-full grid-cols-4">
                {data?.map((prompt) => (
                  <TabsTrigger
                    title={prompt.name}
                    key={prompt.id}
                    value={`${prompt.id}`}
                    className="flex w-full items-center justify-center"
                  >
                    {prompt.name}
                  </TabsTrigger>
                ))}
              </TabsList>
              <TabsContent value={selected}>
                <div
                  className="h-[115px] w-full overflow-y-auto rounded-lg"
                  dangerouslySetInnerHTML={{
                    __html: `${data?.find((prompt) => prompt.id === Number(selected))?.template}`,
                  }}
                />
              </TabsContent>
            </Tabs>
          )}
        </div>
        <div className="mt-auto flex w-full items-center justify-end gap-5">
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

export default PromptSetup;
