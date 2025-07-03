/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";

import type { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { ArrowSwapVertical, Briefcase, More, Trash } from "iconsax-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import WarningModal from "@/components/warning-modal";
import { useDeleteDocumentMutation } from "@/store/services/knowledge";

import KnowledgeSheet from "./knowledge-sheet";

export const columns: ColumnDef<KnowledgeBase>[] = [
  {
    accessorKey: "document_type",
    header: ({ column }) => {
      return (
        <Button
          type="button"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Document Type
          <ArrowSwapVertical size={16} color="#71717A" className="ml-2" />
        </Button>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: "Date",
    cell: ({ row }) => (
      <span>{dayjs(row.original.created_at).format("DD MMM YYYY")}</span>
    ),
  },
  {
    accessorKey: "document_name",
    header: "Document Name",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const [open, setOpen] = useState<boolean>(false);
      const [view, setView] = useState<boolean>(false);
      const [selected, setSelected] = useState<string>("");
      const [deleteDocument, { isLoading }] = useDeleteDocumentMutation();

      const handleDelete = async () => {
        const response = await deleteDocument(selected);

        if (response.data) {
          toast.success("Document Deleted Successfully!");
          setOpen(false);
        } else {
          toast.error("Failed to Delete Document!");
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
                <div
                  onClick={() => {
                    setSelected(row.original.document_id);
                    setView(true);
                  }}
                  className="flex w-full items-center justify-center gap-2.5"
                >
                  <Briefcase color="#000000" size={12} />
                  <span className="flex-1 text-left text-sm font-medium text-black">
                    View Details
                  </span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div
                  onClick={() => {
                    setSelected(row.original.document_id);
                    setOpen(true);
                  }}
                  className="flex w-full cursor-pointer items-center justify-center gap-2.5"
                >
                  <Trash color="#000000" size={12} />
                  <span className="flex-1 text-left text-sm font-medium text-black">
                    Delete
                  </span>
                </div>
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
          <KnowledgeSheet
            content={row.original.document_content}
            open={view}
            setOpen={setView}
          />
        </>
      );
    },
  },
];
