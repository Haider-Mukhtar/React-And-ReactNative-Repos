import { useState } from "react";

import { ArrowLeft2 } from "iconsax-react";
import { Link } from "react-router-dom";

import BusinessHours from "@/components/businesses/business-hours";
import BusinessInformation from "@/components/businesses/business-information";
import KnowledgeBase from "@/components/businesses/knowledge/knowledge-base";
import NumberSetup from "@/components/businesses/number-setup";
import PromptSetup from "@/components/businesses/prompt-setup";
import VoiceSetup from "@/components/businesses/voice-setup";
import { buttonVariants } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const AddBusiness = () => {
  const [activeTab, setActiveTab] = useState<string>("1");

  const handleIncrement = () => {
    if (activeTab === "6") {
      setActiveTab("6");
    } else {
      setActiveTab(`${Number(activeTab) + 1}`);
    }
  };

  const handleDecrement = () => {
    if (activeTab === "1") {
      setActiveTab("1");
    } else {
      setActiveTab(`${Number(activeTab) - 1}`);
    }
  };

  return (
    <div className="flex h-full w-full flex-col items-start justify-start gap-5 overflow-y-auto md:gap-5">
      <div className="flex w-full items-center justify-start gap-2.5">
        <Link to="/agents" className="flex md:hidden">
          <ArrowLeft2 size={26} color="#000000" />
        </Link>
        <span className="flex-1 text-left text-[32px] leading-[32px] font-bold md:text-[36px] md:leading-[36px]">
          Agents
        </span>
      </div>
      <div className="flex w-full items-center justify-between">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full md:w-fit"
        >
          <TabsList className="w-full">
            <TabsTrigger value="1" disabled={true}>
              <div
                className={cn(
                  "hidden size-5 items-center justify-center rounded-full text-white lg:flex",
                  {
                    "bg-[#22C55E]": activeTab > "1",
                    "bg-primary": activeTab === "1",
                    "bg-[#71717A]/30 text-black": activeTab < "1",
                  }
                )}
              >
                <span className="font-medium">1</span>
              </div>
              <span
                className={cn("hidden md:flex", {
                  "text-[#22C55E]": activeTab > "1",
                  "text-primary": activeTab === "1",
                  "text-[#71717A]": activeTab < "1",
                })}
              >
                Agent Set-up
              </span>
              <span
                className={cn("flex md:hidden", {
                  "text-[#22C55E]": activeTab > "1",
                  "text-primary": activeTab === "1",
                  "text-[#71717A]": activeTab < "1",
                })}
              >
                Business
              </span>
            </TabsTrigger>
            <TabsTrigger value="2" disabled={true}>
              <div
                className={cn(
                  "hidden size-5 items-center justify-center rounded-full text-white lg:flex",
                  {
                    "bg-[#22C55E]": activeTab > "2",
                    "bg-primary": activeTab === "2",
                    "bg-[#71717A]/30 text-black": activeTab < "2",
                  }
                )}
              >
                <span className="font-medium">2</span>
              </div>
              <span
                className={cn("hidden md:flex", {
                  "text-[#22C55E]": activeTab > "2",
                  "text-primary": activeTab === "2",
                  "text-[#71717A]": activeTab < "2",
                })}
              >
                Number Set-up
              </span>
              <span
                className={cn("flex md:hidden", {
                  "text-[#22C55E]": activeTab > "2",
                  "text-primary": activeTab === "2",
                  "text-[#71717A]": activeTab < "2",
                })}
              >
                Number
              </span>
            </TabsTrigger>
            <TabsTrigger value="3" disabled={true}>
              <div
                className={cn(
                  "hidden size-5 items-center justify-center rounded-full text-white lg:flex",
                  {
                    "bg-[#22C55E]": activeTab > "3",
                    "bg-primary": activeTab === "3",
                    "bg-[#71717A]/30 text-black": activeTab < "3",
                  }
                )}
              >
                <span className="font-medium">3</span>
              </div>
              <span
                className={cn("hidden md:flex", {
                  "text-[#22C55E]": activeTab > "3",
                  "text-primary": activeTab === "3",
                  "text-[#71717A]": activeTab < "3",
                })}
              >
                Voice Set-up
              </span>
              <span
                className={cn("flex md:hidden", {
                  "text-[#22C55E]": activeTab > "3",
                  "text-primary": activeTab === "3",
                  "text-[#71717A]": activeTab < "3",
                })}
              >
                Voice
              </span>
            </TabsTrigger>
            <TabsTrigger value="4" disabled={true}>
              <div
                className={cn(
                  "hidden size-5 items-center justify-center rounded-full text-white lg:flex",
                  {
                    "bg-[#22C55E]": activeTab > "4",
                    "bg-primary": activeTab === "4",
                    "bg-[#71717A]/30 text-black": activeTab < "4",
                  }
                )}
              >
                <span className="font-medium">4</span>
              </div>
              <span
                className={cn("hidden md:flex", {
                  "text-[#22C55E]": activeTab > "4",
                  "text-primary": activeTab === "4",
                  "text-[#71717A]": activeTab < "4",
                })}
              >
                Prompt Set-up
              </span>
              <span
                className={cn("flex md:hidden", {
                  "text-[#22C55E]": activeTab > "4",
                  "text-primary": activeTab === "4",
                  "text-[#71717A]": activeTab < "4",
                })}
              >
                Prompt
              </span>
            </TabsTrigger>
            <TabsTrigger value="5" disabled={true}>
              <div
                className={cn(
                  "hidden size-5 items-center justify-center rounded-full text-white lg:flex",
                  {
                    "bg-[#22C55E]": activeTab > "5",
                    "bg-primary": activeTab === "5",
                    "bg-[#71717A]/30 text-black": activeTab < "5",
                  }
                )}
              >
                <span className="font-medium">5</span>
              </div>
              <span
                className={cn("hidden md:flex", {
                  "text-[#22C55E]": activeTab > "5",
                  "text-primary": activeTab === "5",
                  "text-[#71717A]": activeTab < "5",
                })}
              >
                Agent Hours
              </span>
              <span
                className={cn("flex md:hidden", {
                  "text-[#22C55E]": activeTab > "5",
                  "text-primary": activeTab === "5",
                  "text-[#71717A]": activeTab < "5",
                })}
              >
                Hours
              </span>
            </TabsTrigger>
            <TabsTrigger value="6" disabled={true}>
              <div
                className={cn(
                  "hidden size-5 items-center justify-center rounded-full text-white lg:flex",
                  {
                    "bg-[#22C55E]": activeTab > "6",
                    "bg-primary": activeTab === "6",
                    "bg-[#71717A]/30 text-black": activeTab < "6",
                  }
                )}
              >
                <span className="font-medium">6</span>
              </div>
              <span
                className={cn("hidden md:flex", {
                  "text-[#22C55E]": activeTab > "6",
                  "text-primary": activeTab === "6",
                  "text-[#71717A]": activeTab < "6",
                })}
              >
                Knowledge Base
              </span>
              <span
                className={cn("flex md:hidden", {
                  "text-[#22C55E]": activeTab > "6",
                  "text-primary": activeTab === "6",
                  "text-[#71717A]": activeTab < "6",
                })}
              >
                Knowledge
              </span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <Link
          to="/agents"
          className={cn(
            buttonVariants({
              variant: "default",
              className: "hidden md:flex",
            })
          )}
        >
          <ArrowLeft2 size={20} color="#FFFFFF" />
          Back to Agents
        </Link>
      </div>
      {activeTab === "1" && (
        <BusinessInformation
          activeTab={activeTab}
          handleDecrement={handleDecrement}
          handleIncrement={handleIncrement}
        />
      )}
      {activeTab === "2" && (
        <NumberSetup
          activeTab={activeTab}
          handleDecrement={handleDecrement}
          handleIncrement={handleIncrement}
        />
      )}
      {activeTab === "3" && (
        <VoiceSetup
          activeTab={activeTab}
          handleDecrement={handleDecrement}
          handleIncrement={handleIncrement}
        />
      )}
      {activeTab === "4" && (
        <PromptSetup
          activeTab={activeTab}
          handleDecrement={handleDecrement}
          handleIncrement={handleIncrement}
        />
      )}
      {activeTab === "5" && (
        <BusinessHours
          activeTab={activeTab}
          handleDecrement={handleDecrement}
          handleIncrement={handleIncrement}
        />
      )}
      {activeTab === "6" && (
        <KnowledgeBase
          activeTab={activeTab}
          handleDecrement={handleDecrement}
          handleIncrement={handleIncrement}
        />
      )}
    </div>
  );
};

export default AddBusiness;
