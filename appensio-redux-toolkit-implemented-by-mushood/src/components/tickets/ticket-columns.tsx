import type { ColumnDef } from "@tanstack/react-table";
import { ArrowDown2, ArrowSwapVertical } from "iconsax-react";

import { cn, truncateString } from "@/lib/utils";

import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export const columns: ColumnDef<Ticket>[] = [
  {
    accessorKey: "business_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Agent Name
          <ArrowSwapVertical size={16} color="#71717A" className="ml-2" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <span className="font-medium">{row.getValue("business_name")}</span>
      );
    },
  },
  {
    accessorKey: "industry",
    header: "Agent Type/Industry",
    cell: ({ row }) => {
      return (
        <span className="rounded-lg border-2 border-[#E4E4E7] px-4 py-1.5 text-[14px] leading-[14px] font-semibold text-[#71717A]">
          {row.getValue("industry")}
        </span>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">
            Status
            <ArrowDown2 size={16} color="#71717A" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {["open", "resolved", "in progress"].map((status) => (
            <DropdownMenuItem
              key={status}
              onSelect={() => column.setFilterValue(status)}
              className={
                column.getFilterValue() === status ? "font-semibold" : ""
              }
            >
              {status}
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onSelect={() => column.setFilterValue(undefined)}
            className="text-red-500"
          >
            Clear Filter
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
    cell: ({ row }) => (
      <div
        className={cn(
          "w-32 rounded-lg border-2 px-4 py-1.5 text-center text-[14px] leading-[14px] font-semibold capitalize",
          {
            "border-[#EC5F5F] text-[#EC5F5F]":
              row.getValue("status") === "open",
            "border-[#CF8000] text-[#CF8000]":
              row.getValue("status") === "in progress",
            "border-[#007E35] text-[#007E35]":
              row.getValue("status") === "resolved",
          }
        )}
      >
        {row.getValue("status")}
      </div>
    ),
    enableColumnFilter: true,
    meta: {
      filterFn: "equals",
    },
  },
  {
    accessorKey: "problem",
    header: "Problem",
    cell: ({ row }) => {
      return (
        <span className="text-sm text-[#71717A]">
          {truncateString(row.getValue("problem"), 35)}
        </span>
      );
    },
  },
  {
    accessorKey: "country",
    header: "Country",
  },
];
