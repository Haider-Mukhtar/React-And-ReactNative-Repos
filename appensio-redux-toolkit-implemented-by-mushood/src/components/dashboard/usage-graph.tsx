import { useState } from "react";

import { ChartCircle } from "iconsax-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { usageConfig } from "@/lib/graph-specs";
import { cn } from "@/lib/utils";
import { useUsageDataQuery } from "@/store/services/stats";

import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";

const UsageGraph = ({ className }: { className?: string }) => {
  const [timestamp, setTimestamp] = useState<string>("daily");

  const { data, isLoading } = useUsageDataQuery(timestamp, {
    refetchOnMountOrArgChange: true,
  });

  return (
    <div
      title="Usage in Minutes Graph"
      className={cn(
        "h-full w-full rounded-2xl border p-3.5 shadow md:p-7",
        className
      )}
    >
      <div className="flex w-full items-center justify-center">
        <span className="flex flex-1 text-left text-[16px] leading-[16px] font-semibold md:hidden md:text-[20px] md:leading-[20px]">
          Usage (min.)
        </span>
        <span className="hidden flex-1 text-left text-[20px] leading-[20px] font-semibold md:flex">
          Usage in Minutes
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
        <ChartContainer
          config={usageConfig}
          className="my-3.5 h-[80%] w-full md:h-[85%]"
        >
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value: string) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Bar
              dataKey="total_minutes"
              stackId="a"
              fill="var(--color-totalMinutes)"
            />
          </BarChart>
        </ChartContainer>
      )}
    </div>
  );
};

export default UsageGraph;
