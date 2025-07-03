import {
  Bill,
  Briefcase,
  CallCalling,
  ChartCircle,
  DocumentText,
  Edit,
  Global,
  GlobalSearch,
  Layer,
  Messages,
  Microphone,
  Note,
  Profile,
  SecurityUser,
  Translate,
} from "iconsax-react";
import { Link, useParams } from "react-router-dom";

import { buttonVariants } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useGetBusinessQuery } from "@/store/services/business";

const BusinessDetails = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetBusinessQuery(id ?? "", {
    refetchOnMountOrArgChange: true,
  });

  return (
    <div className="flex h-full w-full flex-col items-start justify-start gap-5 overflow-y-auto md:gap-5">
      <span className="w-full text-left text-[32px] leading-[32px] font-bold md:text-[36px] md:leading-[36px]">
        View Business Details
      </span>
      {isLoading ? (
        <div className="flex h-full w-full items-center justify-center">
          <ChartCircle size={40} color="#0B33A4" className="animate-spin" />
        </div>
      ) : (
        <>
          <div className="flex w-full flex-col items-center justify-between gap-5 rounded-lg border border-[#0B33A44D] bg-[#0B33A41A] p-5 md:flex-row md:gap-0">
            <div className="flex items-start justify-center gap-5 md:items-center">
              <DocumentText size={40} color="#0B33A4" />
              <div className="flex flex-col items-center justify-center gap-2.5">
                <span className="w-full text-left text-[18px] leading-[18px] font-bold">
                  {data?.business_name}
                </span>
                <span className="w-full text-left text-[16px] leading-[16px] font-normal text-[#71717A]">
                  Technology | {data?.country} |&nbsp;
                  {data?.contact_number}
                </span>
              </div>
            </div>
            <Link
              to={`/agents/edit-agent/${data?.business_id}`}
              className={cn(
                buttonVariants({
                  variant: "outline",
                  className: "border-primary text-primary",
                })
              )}
            >
              <Edit size={20} color="#0B33A4" />
              Edit
            </Link>
          </div>
          <div className="flex w-full items-center justify-center gap-5 border-b border-[#D9D9D9] pb-5">
            <Note size={24} color="#0B33A4" />
            <span className="flex-1 text-left text-[24px] leading-[24px] font-bold">
              Business Set-up
            </span>
          </div>
          <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2">
            <div className="col-span-1 flex w-full items-center justify-center rounded-md bg-[#F4F4F5] p-3.5">
              <div className="flex w-full items-center justify-start gap-2.5">
                <Note size={20} color="#0B33A4" />
                <span className="text-[16px] leading-[16px] font-semibold">
                  Business Name:
                </span>
              </div>
              <span className="w-full text-right text-[16px] leading-[16px] font-normal text-[#71717A]">
                {data?.business_name}
              </span>
            </div>
            <div className="col-span-1 flex w-full items-center justify-center rounded-md bg-[#F4F4F5] p-3.5">
              <div className="flex w-full items-center justify-start gap-2.5">
                <Briefcase size={20} color="#0B33A4" />
                <span className="text-[16px] leading-[16px] font-semibold">
                  Industry:
                </span>
              </div>
              <span className="w-full text-right text-[16px] leading-[16px] font-normal text-[#71717A]">
                {data?.industry_type}
              </span>
            </div>
            <div className="col-span-1 flex w-full items-center justify-center rounded-md bg-[#F4F4F5] p-3.5">
              <div className="flex w-full items-center justify-start gap-2.5">
                <CallCalling size={20} color="#0B33A4" />
                <span className="text-[16px] leading-[16px] font-semibold">
                  Contact Number:
                </span>
              </div>
              <span className="w-full text-right text-[16px] leading-[16px] font-normal text-[#71717A]">
                {data?.contact_number}
              </span>
            </div>
            <div className="col-span-1 flex w-full items-center justify-center rounded-md bg-[#F4F4F5] p-3.5">
              <div className="flex w-full items-center justify-start gap-2.5">
                <GlobalSearch size={20} color="#0B33A4" />
                <span className="text-[16px] leading-[16px] font-semibold">
                  Website:
                </span>
              </div>
              <span className="w-full text-right text-[16px] leading-[16px] font-normal text-[#71717A]">
                {data?.website}
              </span>
            </div>
            <div className="col-span-1 flex w-full items-center justify-center rounded-md bg-[#F4F4F5] p-3.5">
              <div className="flex w-full items-center justify-start gap-2.5">
                <Global size={20} color="#0B33A4" />
                <span className="text-[16px] leading-[16px] font-semibold">
                  Country:
                </span>
              </div>
              <span className="w-full text-right text-[16px] leading-[16px] font-normal text-[#71717A]">
                {data?.country}
              </span>
            </div>
            <div className="col-span-1 flex w-full items-center justify-center rounded-md bg-[#F4F4F5] p-3.5">
              <div className="flex w-full items-center justify-start gap-2.5">
                <Translate size={20} color="#0B33A4" />
                <span className="text-[16px] leading-[16px] font-semibold">
                  Language:
                </span>
              </div>
              <span className="w-full text-right text-[16px] leading-[16px] font-normal text-[#71717A]">
                {data?.language}
              </span>
            </div>
          </div>
          <div className="flex w-full items-center justify-center gap-5 border-b border-[#D9D9D9] pb-5">
            <CallCalling size={24} color="#0B33A4" />
            <span className="flex-1 text-left text-[24px] leading-[24px] font-bold">
              Number Set-up
            </span>
          </div>
          <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2">
            <div className="col-span-1 flex w-full items-center justify-center rounded-md bg-[#F4F4F5] p-3.5">
              <div className="flex w-full items-center justify-start gap-2.5">
                <CallCalling size={20} color="#0B33A4" />
                <span className="text-[16px] leading-[16px] font-semibold">
                  Phone Number:
                </span>
              </div>
              <span className="w-full text-right text-[16px] leading-[16px] font-normal text-[#71717A]">
                {data?.twilio ?? "N/A"}
              </span>
            </div>
            <div className="col-span-1 flex w-full items-center justify-center rounded-md bg-[#F4F4F5] p-3.5">
              <div className="flex w-full items-center justify-start gap-2.5">
                <CallCalling size={20} color="#0B33A4" />
                <span className="text-[16px] leading-[16px] font-semibold">
                  Number Type:
                </span>
              </div>
              <span className="w-full text-right text-[16px] leading-[16px] font-normal text-[#71717A]">
                Generated
              </span>
            </div>
          </div>
          <div className="flex w-full items-center justify-center gap-5 border-b border-[#D9D9D9] pb-5">
            <Microphone size={24} color="#0B33A4" />
            <span className="flex-1 text-left text-[24px] leading-[24px] font-bold">
              Voice Set-up
            </span>
          </div>
          <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2">
            <div className="col-span-1 flex w-full items-center justify-center rounded-md bg-[#F4F4F5] p-3.5">
              <div className="flex w-full items-center justify-start gap-2.5">
                <Messages size={20} color="#0B33A4" />
                <span className="text-[16px] leading-[16px] font-semibold">
                  Communication Type:
                </span>
              </div>
              <span className="w-full text-right text-[16px] leading-[16px] font-normal text-[#71717A]">
                Inbound & Outbound
              </span>
            </div>
            <div className="col-span-1 flex w-full items-center justify-center rounded-md bg-[#F4F4F5] p-3.5">
              <div className="flex w-full items-center justify-start gap-2.5">
                <Translate size={20} color="#0B33A4" />
                <span className="text-[16px] leading-[16px] font-semibold">
                  Language:
                </span>
              </div>
              <span className="w-full text-right text-[16px] leading-[16px] font-normal text-[#71717A]">
                {data?.transcriber_language ?? "N/A"}
              </span>
            </div>
            <div className="col-span-1 flex w-full items-center justify-center rounded-md bg-[#F4F4F5] p-3.5">
              <div className="flex w-full items-center justify-start gap-2.5">
                <Layer size={20} color="#0B33A4" />
                <span className="text-[16px] leading-[16px] font-semibold">
                  AI Model:
                </span>
              </div>
              <span className="w-full text-right text-[16px] leading-[16px] font-normal text-[#71717A]">
                {data?.ai_model ?? "N/A"}
              </span>
            </div>
            <div className="col-span-1 flex w-full items-center justify-center rounded-md bg-[#F4F4F5] p-3.5">
              <div className="flex w-full items-center justify-start gap-2.5">
                <Note size={20} color="#0B33A4" />
                <span className="text-[16px] leading-[16px] font-semibold">
                  Transcriber:
                </span>
              </div>
              <span className="w-full text-right text-[16px] leading-[16px] font-normal text-[#71717A]">
                {data?.transcriber_provider ?? "N/A"}
              </span>
            </div>
            <div className="col-span-1 flex w-full items-center justify-center rounded-md bg-[#F4F4F5] p-3.5">
              <div className="flex w-full items-center justify-start gap-2.5">
                <SecurityUser size={20} color="#0B33A4" />
                <span className="text-[16px] leading-[16px] font-semibold">
                  Voice Agent Provider:
                </span>
              </div>
              <span className="w-full text-right text-[16px] leading-[16px] font-normal text-[#71717A]">
                {data?.voice_provider ?? "N/A"}
              </span>
            </div>
            <div className="col-span-1 flex w-full items-center justify-center rounded-md bg-[#F4F4F5] p-3.5">
              <div className="flex w-full items-center justify-start gap-2.5">
                <Profile size={20} color="#0B33A4" />
                <span className="text-[16px] leading-[16px] font-semibold">
                  Voice Agent:
                </span>
              </div>
              <span className="w-full text-right text-[16px] leading-[16px] font-normal text-[#71717A]">
                {data?.voice ?? "N/A"}
              </span>
            </div>
          </div>
          <div className="flex w-full items-center justify-center gap-5 border-b border-[#D9D9D9] pb-5">
            <Bill size={24} color="#0B33A4" />
            <span className="flex-1 text-left text-[24px] leading-[24px] font-bold">
              Prompt Set-up
            </span>
          </div>
          <div className="h-fit w-full">
            <Textarea
              disabled={true}
              value={data?.system_prompt ?? "N/A"}
              className="!disabled:bg-[#F4F4F5] h-40 w-full !cursor-default resize-none rounded-xl border-none bg-gray-200 p-5"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default BusinessDetails;
