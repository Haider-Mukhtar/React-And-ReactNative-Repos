import { ChartCircle } from "iconsax-react";

import { cn } from "@/lib/utils";
import { useActiveBusinessesQuery } from "@/store/services/stats";

const ActiveBusinessTable = ({ className }: { className?: string }) => {
  const { data, isLoading } = useActiveBusinessesQuery({});

  return (
    <div
      className={cn(
        "flex h-full max-h-[474px] w-full flex-col items-start justify-start rounded-2xl border p-3.5 shadow md:p-7",
        className
      )}
    >
      <span className="w-full text-left text-[16px] leading-[16px] font-semibold md:text-[20px] md:leading-[20px]">
        Top 5 Most Active Agents
      </span>
      <div className="mt-3.5 grid w-full grid-cols-2 rounded-lg bg-[#F4F4F5] p-5 md:mt-7">
        <span className="col-span-1 w-full text-left text-[16px] leading-[16px] font-medium">
          Agent Name
        </span>
        <span className="col-span-1 w-full text-right text-[16px] leading-[16px] font-medium md:text-left lg:text-right">
          Calls
        </span>
      </div>
      {isLoading ? (
        <div className="flex h-[358px] w-full items-center justify-center">
          <ChartCircle size={40} color="#0B33A4" className="animate-spin" />
        </div>
      ) : (
        <div className="flex h-[358px] w-full flex-col items-start justify-start overflow-y-auto">
          {data?.map((business, idx) => (
            <div
              key={idx}
              className="grid w-full grid-cols-2 py-2.5 pr-5 pl-2.5"
            >
              <div className="col-span-1 flex w-full items-center justify-start gap-5">
                <span className="flex-1 text-left text-[12px] leading-[12px] font-medium md:text-[16px] md:leading-[16px]">
                  {business.name}
                </span>
              </div>
              <div className="col-span-1 flex h-full w-full items-center justify-center text-[12px] leading-[12px] font-medium md:justify-start md:text-[16px] md:leading-[16px]">
                <span className="w-full text-right md:text-left lg:text-right">
                  {business.calls}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ActiveBusinessTable;
