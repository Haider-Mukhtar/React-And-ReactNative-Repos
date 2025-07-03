import { useMemo } from "react";

import { ChartCircle } from "iconsax-react";
import { Label, Pie, PieChart } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { cleanPieData, cn, generateCallDistributionConfig } from "@/lib/utils";
import { useCallDistributionDataQuery } from "@/store/services/stats";

const CallDistributionGraph = ({ className }: { className?: string }) => {
  const { data, isLoading } = useCallDistributionDataQuery({});

  const totalCalls = useMemo(() => {
    return data?.reduce((acc, curr) => acc + curr.calls, 0);
  }, [data]);

  // bg-chart-1
  // bg-chart-2
  // bg-chart-3
  // bg-chart-4
  // bg-chart-5
  // var(--chart-1)
  // var(--chart-2)
  // var(--chart-3)
  // var(--chart-4)
  // var(--chart-5)

  return (
    <div
      className={cn(
        "flex h-full w-full flex-col items-center justify-start rounded-2xl border p-3.5 shadow md:gap-14 md:p-7",
        className
      )}
    >
      <span className="w-full text-left text-[16px] leading-[16px] font-semibold md:text-[20px] md:leading-[20px]">
        Call Distribution by Agent Type
      </span>
      {isLoading ? (
        <div className="flex h-[358px] w-full items-center justify-center">
          <ChartCircle size={40} color="#0B33A4" className="animate-spin" />
        </div>
      ) : (
        <div className="flex w-full flex-col items-center justify-center md:flex-row">
          <ChartContainer
            config={generateCallDistributionConfig(data!)!}
            className="aspect-square w-full"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={cleanPieData(data!)!}
                dataKey="calls"
                nameKey="business"
                innerRadius={65}
                strokeWidth={5}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            {totalCalls?.toLocaleString()}
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
          <div className="grid w-full grid-cols-2 items-center justify-center gap-5 md:grid-cols-1">
            {data?.map((item, idx) => (
              <div key={idx} className="flex items-center justify-center gap-2">
                <div
                  className={`bg-chart-${idx + 1} size-3 shrink-0 rounded-[3px]`}
                />
                <span className="w-28 text-[12px] leading-[12px] font-medium md:text-[16px] md:leading-[16px]">
                  {item.business}&nbsp;(
                  {isNaN(
                    Math.ceil((Number(item.calls) / (totalCalls ?? 1)) * 100)
                  )
                    ? 0
                    : Math.ceil((Number(item.calls) / (totalCalls ?? 1)) * 100)}
                  %)
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default CallDistributionGraph;
