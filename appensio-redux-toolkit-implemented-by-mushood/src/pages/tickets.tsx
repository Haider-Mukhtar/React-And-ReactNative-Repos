import { ChartCircle } from "iconsax-react";

import DataTable from "@/components/tickets/data-table";
import { columns } from "@/components/tickets/ticket-columns";
import { formatTicketStats } from "@/lib/utils";
import {
  useGetTicketStatsQuery,
  useGetTicketsQuery,
} from "@/store/services/ticket";

const Tickets = () => {
  const { data, isLoading } = useGetTicketsQuery({});
  const { data: stats, isLoading: isLoadingStats } = useGetTicketStatsQuery({});

  return (
    <div className="flex h-full w-full flex-col items-start justify-start md:overflow-hidden">
      <span className="w-full text-left text-[32px] leading-[32px] font-bold md:text-[36px] md:leading-[36px]">
        Tickets
      </span>
      {isLoadingStats ? (
        <div className="flex h-[144px] w-full items-center justify-center">
          <ChartCircle size={40} color="#0B33A4" className="animate-spin" />
        </div>
      ) : (
        <div className="grid w-full grid-cols-1 gap-2.5 pt-5 md:grid-cols-3 md:pt-5">
          {formatTicketStats(stats!).map((card) => (
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
      {isLoading ? (
        <div className="mt-3.5 flex w-full items-center justify-center md:h-[calc(100vh-318px)] md:overflow-y-auto">
          <ChartCircle size={40} color="#0B33A4" className="animate-spin" />
        </div>
      ) : (
        <div className="mt-3.5 w-full md:h-[calc(100vh-318px)] md:overflow-y-auto">
          <DataTable data={data!} columns={columns} />
        </div>
      )}
    </div>
  );
};

export default Tickets;
