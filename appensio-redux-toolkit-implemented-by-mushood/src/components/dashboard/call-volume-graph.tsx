import { useState } from "react";

import { ChartCircle } from "iconsax-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { callVolumeConfig } from "@/lib/graph-specs";
import { cn } from "@/lib/utils";
import { useCallVolumeDataQuery } from "@/store/services/stats";

import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";

const CallVolumeGraph = ({ className }: { className?: string }) => {
  const [timestamp, setTimestamp] = useState<string>("daily");
  const { data, isLoading } = useCallVolumeDataQuery(timestamp, {
    refetchOnMountOrArgChange: true,
  });

  return (
    <div
      className={cn(
        "h-full w-full rounded-2xl border p-3.5 shadow md:p-7",
        className
      )}
    >
      <div className="flex w-full items-center justify-center">
        <span className="flex-1 text-left text-[16px] leading-[16px] font-semibold md:text-[20px] md:leading-[20px]">
          Call Volume
        </span>
        <Tabs value={timestamp} onValueChange={setTimestamp}>
          <TabsList>
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      {isLoading ? (
        <div className="flex h-[358px] w-full items-center justify-center">
          <ChartCircle size={40} color="#0B33A4" className="animate-spin" />
        </div>
      ) : (
        <ChartContainer config={callVolumeConfig} className="my-3.5 w-full">
          <LineChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value: string) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="totalCalls"
              type="natural"
              stroke="var(--color-totalCalls)"
              strokeWidth={4}
              dot={false}
            />
            <Line
              dataKey="successCalls"
              type="natural"
              stroke="var(--color-successCalls)"
              strokeWidth={4}
              dot={false}
            />
            <Line
              dataKey="failedCalls"
              type="natural"
              stroke="var(--color-failedCalls)"
              strokeWidth={4}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      )}
      <div className="flex w-full items-center justify-between md:justify-start md:gap-10">
        <div className="flex items-center justify-center gap-2">
          <div className="bg-chart-1 size-3 shrink-0 rounded-[3px]" />
          <span className="text-[12px] leading-[12px] font-medium md:text-[16px] md:leading-[16px]">
            Total Calls
          </span>
        </div>
        <div className="flex items-center justify-center gap-2">
          <div className="bg-chart-5 size-3 shrink-0 rounded-[3px]" />
          <span className="text-[12px] leading-[12px] font-medium md:text-[16px] md:leading-[16px]">
            Success Calls
          </span>
        </div>
        <div className="flex items-center justify-center gap-2">
          <div className="bg-chart-4 size-3 shrink-0 rounded-[3px]" />
          <span className="text-[12px] leading-[12px] font-medium md:text-[16px] md:leading-[16px]">
            Failed Calls
          </span>
        </div>
      </div>
    </div>
  );
};

export default CallVolumeGraph;
