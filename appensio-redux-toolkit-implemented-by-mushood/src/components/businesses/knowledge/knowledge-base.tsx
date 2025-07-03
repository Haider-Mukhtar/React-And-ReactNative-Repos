import { useState } from "react";

import { AddCircle, ChartCircle, DocumentText } from "iconsax-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { RootState } from "@/store";
import { useGetKnowledgeBaseQuery } from "@/store/services/knowledge";

import DataTable from "../data-table";
import AddDocumentDialog from "./add-document-dialog";
import { columns } from "./knowledge-columns";

const KnowledgeBase = ({
  activeTab,
  handleDecrement,
}: BusinessStepperFormProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const { business } = useSelector((state: RootState) => state.global);

  const { data, isLoading } = useGetKnowledgeBaseQuery(business.id, {
    skip: !business.id,
    refetchOnMountOrArgChange: true,
  });

  return (
    <>
      <div className="flex w-full flex-col items-start justify-start gap-5 overflow-y-auto md:h-[772px] md:gap-5">
        <div className="flex w-full items-center justify-center">
          <span className="flex-1 text-left text-sm text-[#71717A]">
            List of Documents
          </span>
          <Button
            type="button"
            onClick={() => setOpen(true)}
            variant="default"
            size="sm"
          >
            + Add Document&nbsp;
            <DocumentText
              size={20}
              color="#0B33A4"
              className="text-primary fill-white"
            />
          </Button>
        </div>
        {isLoading ? (
          <div className="flex h-[664px] w-full items-center justify-center">
            <ChartCircle size={40} color="#0B33A4" className="animate-spin" />
          </div>
        ) : data?.length === 0 ? (
          <div className="flex h-full w-full items-center justify-center">
            <div className="flex aspect-video w-1/2 flex-col items-center justify-center gap-7 rounded-3xl bg-[#F4F4F5]">
              <span className="w-full text-center text-[48px] leading-[48px] font-bold">
                Upload Document
              </span>
              <span className="w-full text-center text-[16px] leading-[18px] text-[#71717A]">
                Your knowledge base is empty click&nbsp;
                <span className="font-semibold text-[#09090B]">
                  "Upload Document"
                </span>
                <br />
                to get started!
              </span>
              <Button
                onClick={() => setOpen(true)}
                type="button"
                variant="default"
                size="lg"
              >
                <AddCircle size={20} color="#FFFFFF" /> Upload First Document
              </Button>
            </div>
          </div>
        ) : (
          <div className="h-[664px] w-full overflow-y-auto">
            <DataTable data={data!} columns={columns} />
          </div>
        )}
        <div className="flex w-full items-center justify-end gap-2.5">
          <Button
            onClick={handleDecrement}
            disabled={activeTab === "1"}
            type="button"
            variant="secondary"
            size="sm"
          >
            Previous
          </Button>
          <Link
            to="/agents"
            className={cn(
              buttonVariants({
                variant: "default",
                size: "sm",
              })
            )}
          >
            Finish
          </Link>
        </div>
      </div>
      <AddDocumentDialog open={open} setOpen={setOpen} />
    </>
  );
};

export default KnowledgeBase;
