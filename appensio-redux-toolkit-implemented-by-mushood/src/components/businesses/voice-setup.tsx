import { zodResolver } from "@hookform/resolvers/zod";
import { ChartCircle } from "iconsax-react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { z } from "zod";

import { voicesMap } from "@/lib/constants";
import { type RootState } from "@/store";
import { usePostBusinessAssistantMutation } from "@/store/services/business";

import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const VoiceSetupSchema = z.object({
  communicationType: z.enum(["inbound", "outbound", "inbound & outbound"], {
    errorMap: () => ({
      message: "Must select inbound, outbound or inbound & outbound.",
    }),
  }),
  language: z.string().nonempty({ message: "Language selection is required." }),
  aiModel: z.string().nonempty({ message: "AI model is required." }),
  transcriber: z
    .string()
    .nonempty({ message: "Transcriber selection is required." }),
  voiceAgent: z
    .string()
    .nonempty({ message: "Voice Agent selection is required." }),
  provider: z.string().nonempty({ message: "Provider selection is required." }),
  agent: z.string().nonempty({ message: "Agent selection is required." }),
});

const VoiceSetup = ({
  activeTab,
  handleDecrement,
  handleIncrement,
}: BusinessStepperFormProps) => {
  const { business } = useSelector((state: RootState) => state.global);
  const [createVoiceAssistant, { isLoading }] =
    usePostBusinessAssistantMutation();

  const form = useForm<z.infer<typeof VoiceSetupSchema>>({
    resolver: zodResolver(VoiceSetupSchema),
    defaultValues: {
      communicationType: "inbound & outbound",
      language: "en-US",
      aiModel: "gpt-4o-mini",
      transcriber: "azure",
      voiceAgent: "Andrew",
      provider: "azure",
      agent: "andrew",
    },
  });

  const handleSubmit = async (values: z.infer<typeof VoiceSetupSchema>) => {
    const response = await createVoiceAssistant({
      ai_model_name: values.aiModel,
      business_id: business.id,
      communication_type: values.communicationType,
      transcriber_language: values.language,
      transcriber_provider: values.transcriber,
      voice_agent: values.voiceAgent.toLowerCase(),
      voice_agent_provider: values.provider,
      edit_privilege: false,
    });

    if (response.data) {
      toast.success("Successfully Setup Voice!");
      handleIncrement();
    } else {
      toast.error("Failed to Setup Voice!");
    }
  };

  type Provider = keyof typeof voicesMap;
  const currentProvider = (form.watch("provider") ?? "vapi") as Provider;
  const voiceList = voicesMap[currentProvider];

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex w-full flex-col items-start justify-start gap-5 overflow-y-auto md:h-[772px] md:gap-5"
      >
        <div className="flex w-full items-center justify-center gap-5 border-b border-[#D9D9D9] pb-5">
          <span className="w-full text-left text-[24px] leading-[24px] font-bold">
            Voice Set-up
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
        <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2">
          <FormField
            control={form.control}
            name="communicationType"
            render={({ field }) => (
              <FormItem>
                <span className="w-full text-left text-[14px] leading-[14px] font-semibold">
                  Communication Type<span className="text-destructive">*</span>
                </span>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl className="w-full">
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a Type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {["Inbound & Outbound", "Inbound", "Outbound"].map(
                      (item, idx) => (
                        <SelectItem key={idx} value={item.toLowerCase()}>
                          {item}
                        </SelectItem>
                      )
                    )}
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
                <span className="w-full text-left text-[14px] leading-[14px] font-semibold">
                  Language<span className="text-destructive">*</span>
                </span>
                <Select onValueChange={field.onChange} value={field.value}>
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
            name="aiModel"
            render={({ field }) => (
              <FormItem>
                <span className="w-full text-left text-[14px] leading-[14px] font-semibold">
                  AI Model<span className="text-destructive">*</span>
                </span>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl className="w-full">
                    <SelectTrigger>
                      <SelectValue placeholder="Select Model" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {[
                      "gpt-4o-mini",
                      "openai",
                      "togetherai",
                      "deepinfra",
                      "perplexity",
                      "gemini",
                      "openrouter",
                      "groq",
                      "anthropic",
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
            name="transcriber"
            render={({ field }) => (
              <FormItem>
                <span className="w-full text-left text-[14px] leading-[14px] font-semibold">
                  Transcriber<span className="text-destructive">*</span>
                </span>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl className="w-full">
                    <SelectTrigger>
                      <SelectValue placeholder="Select Transcriber" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {[
                      "azure",
                      "deepgram",
                      "gladia",
                      "talkscriber",
                      "google",
                      "assemblyai",
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
            name="provider"
            render={({ field }) => (
              <FormItem>
                <span className="w-full text-left text-[14px] leading-[14px] font-semibold">
                  Voice Agent Provider
                  <span className="text-destructive">*</span>
                </span>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl className="w-full">
                    <SelectTrigger>
                      <SelectValue placeholder="Select Agent Provider" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.keys(voicesMap).map((item, idx) => (
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
            name="voiceAgent"
            render={({ field }) => (
              <FormItem>
                <span className="w-full text-left text-[14px] leading-[14px] font-semibold">
                  Voice Agent<span className="text-destructive">*</span>
                </span>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl className="w-full">
                    <SelectTrigger>
                      <SelectValue placeholder="Select Agent" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {voiceList.map((item, idx) => (
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
export default VoiceSetup;
