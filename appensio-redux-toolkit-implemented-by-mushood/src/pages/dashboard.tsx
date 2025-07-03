import { ChartCircle } from "iconsax-react";

import ActiveBusinessTable from "@/components/dashboard/active-business-table";
import CallDistributionGraph from "@/components/dashboard/call-distribution-graph";
import CallVolumeGraph from "@/components/dashboard/call-volume-graph";
import UsageGraph from "@/components/dashboard/usage-graph";
import { formatDashboardStats } from "@/lib/utils";
import { useDashboardStatsQuery } from "@/store/services/stats";

const Dashboard = () => {
  const { data, isLoading } = useDashboardStatsQuery({});

  return (
    <div className="flex h-full w-full flex-col items-start justify-start md:overflow-hidden">
      <span className="w-full text-left text-[32px] leading-[32px] font-bold md:text-[36px] md:leading-[36px]">
        Dashboard
      </span>
      {isLoading ? (
        <div className="flex h-[144px] w-full items-center justify-center">
          <ChartCircle size={40} color="#0B33A4" className="animate-spin" />
        </div>
      ) : (
        <div className="grid w-full grid-cols-1 gap-2.5 pt-5 md:grid-cols-3 md:pt-5">
          {formatDashboardStats(data!).map((card) => (
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
      <div className="mt-3.5 w-full md:h-[calc(100vh-318px)] md:overflow-y-auto">
        <div className="mb-3.5 grid w-full grid-cols-1 gap-3.5 lg:grid-cols-2">
          <CallVolumeGraph className="col-span-1" />
          <CallDistributionGraph className="col-span-1" />
        </div>
        <div className="grid w-full grid-cols-1 gap-3.5 lg:grid-cols-2">
          <UsageGraph className="col-span-1" />
          <ActiveBusinessTable className="col-span-1" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
