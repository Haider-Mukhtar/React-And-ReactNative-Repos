import { AddCircle, ChartCircle } from "iconsax-react";
import { Link } from "react-router-dom";

import { columns } from "@/components/businesses/columns";
import DataTable from "@/components/businesses/data-table";
import { buttonVariants } from "@/components/ui/button";
import { cn, formatBusinessStats } from "@/lib/utils";
import { useGetAllBusinessesQuery } from "@/store/services/business";
import { useBusinessStatsQuery } from "@/store/services/stats";

const Businesses = () => {
  const { data, isLoading } = useGetAllBusinessesQuery({});
  const { data: stats, isLoading: statsLoading } = useBusinessStatsQuery({});

  return (
    <div className="flex h-full w-full flex-col items-start justify-start overflow-hidden">
      <div className="flex w-full items-center justify-center">
        <span className="flex-1 text-left text-[32px] leading-[32px] font-bold md:text-[36px] md:leading-[36px]">
          Agents
        </span>
        <Link
          to="/agents/add-agent"
          className={cn(
            buttonVariants({
              variant: "ghost",
              className: "text-primary hover:text-primary",
            })
          )}
        >
          <AddCircle size={16} color="#0B33A4" />
          Add Agent
        </Link>
      </div>
      {statsLoading ? (
        <div className="flex h-[144px] w-full items-center justify-center">
          <ChartCircle size={40} color="#0B33A4" className="animate-spin" />
        </div>
      ) : (
        <div className="grid w-full grid-cols-1 gap-2.5 pt-5 md:grid-cols-3 md:pt-5">
          {formatBusinessStats(stats!).map((card) => (
            <div
              key={card.id}
              className="col-span-1 flex w-full flex-col items-center justify-center gap-3.5 rounded-[15px] border p-7 shadow"
            >
              <div className="flex w-full items-center justify-center">
                <span className="flex-1 text-left text-[16px] leading-[16px] font-medium">
                  {card.name}
                </span>
                <card.icon color="#000000" size={24} />
              </div>
              <span className="w-full text-left text-[48px] leading-[48px] font-bold">
                {card.amount}
              </span>
            </div>
          ))}
        </div>
      )}
      <div className="mt-3.5 h-[calc(100vh-318px)] w-full overflow-y-auto">
        {isLoading ? (
          <div className="flex h-full w-full items-center justify-center">
            <ChartCircle size={40} color="#0B33A4" className="animate-spin" />
          </div>
        ) : (
          <DataTable data={data!} columns={columns} />
        )}
      </div>
    </div>
  );
};

export default Businesses;
