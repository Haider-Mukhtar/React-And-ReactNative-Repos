/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";

import type { ColumnDef } from "@tanstack/react-table";
import {
  ArrowSwapVertical,
  Briefcase,
  Edit,
  Lock,
  More,
  Trash,
} from "iconsax-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

import { useDeleteBusinessMutation } from "@/store/services/business";

import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import WarningModal from "../warning-modal";
import ResetPassword from "./reset-password";

export const columns: ColumnDef<Business>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowSwapVertical size={16} color="#71717A" className="ml-2" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <span className="font-medium">{row.getValue("name")}</span>;
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
    accessorKey: "contact_number",
    header: "Contact Number",
  },
  {
    accessorKey: "twilio",
    header: "Twilio Number",
  },
  {
    accessorKey: "email",
    header: "Agent Email",
  },
  {
    accessorKey: "country",
    header: "Country",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const [selected, setSelected] = useState<{
        id: string;
        email: string;
      }>({
        id: "",
        email: "",
      });
      const [open, setOpen] = useState<boolean>(false);
      const [reset, setReset] = useState<boolean>(false);
      const [deleteBusiness, { isLoading }] = useDeleteBusinessMutation();

      const handleDelete = async () => {
        const response = await deleteBusiness(selected.id);

        if (response.data) {
          toast.success("Business Deleted Successfully!");
          setOpen(false);
        } else {
          toast.error("Failed to Delete Business!");
        }
      };

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <More
                  size={16}
                  color="#71717A"
                  className="rotate-90 fill-[#71717A]"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Link
                  to={`/agents/edit-agent/${row.original.id}`}
                  className="flex w-full items-center justify-center gap-2.5"
                >
                  <Edit color="#000000" size={12} />
                  <span className="flex-1 text-left text-sm font-medium text-black">
                    Edit
                  </span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div
                  onClick={() => {
                    setSelected({
                      id: row.original.id,
                      email: row.original.email,
                    });
                    setReset(true);
                  }}
                  className="flex w-full items-center justify-center gap-2.5"
                >
                  <Lock color="#000000" size={12} />
                  <span className="flex-1 text-left text-sm font-medium text-black">
                    Reset Password
                  </span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div
                  onClick={() => {
                    setSelected({
                      id: row.original.id,
                      email: row.original.email,
                    });
                    setOpen(true);
                  }}
                  className="flex w-full cursor-pointer items-center justify-center gap-2.5"
                >
                  <Trash color="#000000" size={12} />
                  <span className="flex-1 text-left text-sm font-medium text-black">
                    Deactivate
                  </span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  to={`/agents/${row.original.id}`}
                  className="flex w-full items-center justify-center gap-2.5"
                >
                  <Briefcase color="#000000" size={12} />
                  <span className="flex-1 text-left text-sm font-medium text-black">
                    View Details
                  </span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <WarningModal
            open={open}
            title="Are you Sure?"
            text={
              <span>
                This action is irreversible, please
                <br />
                make sure before confirming.
              </span>
            }
            setOpen={setOpen}
            cta={handleDelete}
            isLoading={isLoading}
          />
          <ResetPassword open={reset} data={selected} setOpen={setReset} />
        </>
      );
    },
  },
];
