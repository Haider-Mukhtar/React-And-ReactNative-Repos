import type { Dispatch, ReactNode, SetStateAction } from "react";

import { ChartCircle, Warning2 } from "iconsax-react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";

interface WarningModalProps {
  open: boolean;
  title: string;
  text: ReactNode;
  cta?: () => void;
  isLoading?: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const WarningModal = ({
  cta,
  open,
  text,
  title,
  setOpen,
  isLoading,
}: WarningModalProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <div className="flex flex-col items-center justify-center py-10">
          <div className="bg-destructive/20 size-20 rounded-full p-3">
            <Warning2 size="100%" color="#FF0000" className="size-full" />
          </div>
          <span className="mt-7 mb-2.5 w-full text-center text-[24px] leading-[24px] font-semibold tracking-tight">
            {title}
          </span>
          <span className="text-muted-foreground w-full text-center text-[14px] leading-[18px] font-medium tracking-tight">
            {text}
          </span>
        </div>
        <DialogFooter>
          <Button
            onClick={() => setOpen(false)}
            type="button"
            variant="secondary"
            className="cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            disabled={isLoading}
            onClick={() => {
              if (cta) {
                cta();
              }
            }}
            type="button"
            variant="destructive"
            className="cursor-pointer"
          >
            {isLoading ? (
              <ChartCircle size={20} color="#FFFFFF" className="animate-spin" />
            ) : (
              "Confirm"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WarningModal;
