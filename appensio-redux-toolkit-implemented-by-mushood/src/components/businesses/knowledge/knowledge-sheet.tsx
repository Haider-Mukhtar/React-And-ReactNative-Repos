import type { Dispatch, SetStateAction } from "react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface KnowledgeSheetProps {
  open: boolean;
  content: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const KnowledgeSheet = ({ content, open, setOpen }: KnowledgeSheetProps) => {
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-primary p-1.5 text-[28px] leading-[28px] font-bold md:text-[36px] md:leading-[36px]">
            Chat Formatter
          </SheetTitle>
        </SheetHeader>
        <div className="mb-5 flex h-[calc(100vh-100px)] w-full items-start justify-start overflow-y-auto px-5 text-sm text-[#71717A]">
          {content}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default KnowledgeSheet;
