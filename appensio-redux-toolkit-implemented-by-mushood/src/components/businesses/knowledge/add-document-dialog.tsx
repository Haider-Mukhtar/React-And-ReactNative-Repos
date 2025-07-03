import {
  type ChangeEvent,
  type Dispatch,
  type SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

import { ChartCircle } from "iconsax-react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

import UploadIcon from "@/assets/icons/upload.svg";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { extractTextFromFile } from "@/lib/utils";
import type { RootState } from "@/store";
import { useUploadDocumentMutation } from "@/store/services/knowledge";

interface AddDocumentDialogProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const AddDocumentDialog = ({ open, setOpen }: AddDocumentDialogProps) => {
  const [file, setFile] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [uploadDoc, { isLoading }] = useUploadDocumentMutation();
  const { business } = useSelector((state: RootState) => state.global);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      if (
        selectedFile.type === "application/pdf" ||
        selectedFile.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        setFile(selectedFile);
      } else {
        toast.error("Invalid file type. Please upload a PDF or Word document.");
      }
    } else {
      setFile(null);
    }
  };

  const handleSubmit = async () => {
    const extractedText = await extractTextFromFile(file!);

    const response = await uploadDoc({
      business_id: business.id,
      body: {
        document_content: extractedText,
        document_name: file!.name,
        document_type: file!.type,
      },
    });

    if (response.data) {
      toast.success("Document uploaded successfully!");
      setFile(null);
      setOpen(false);
    } else {
      toast.error("Failed to upload document!");
    }
  };

  useEffect(() => {
    if (open) {
      setFile(null);
      if (fileRef.current) {
        fileRef.current.value = "";
      }
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload Document</DialogTitle>
        </DialogHeader>
        <div className="flex w-full flex-col items-center justify-center gap-5">
          <Input
            ref={fileRef}
            type="file"
            className="hidden"
            accept=".pdf,.docx"
            multiple={false}
            onChange={handleFileChange}
          />
          <div
            onClick={() => {
              if (fileRef.current) {
                fileRef.current.click();
              }
            }}
            className="bg-primary flex w-full items-center justify-center gap-5 rounded-lg py-5 text-white"
          >
            <img src={UploadIcon} alt="upload-icon" className="invert" />
            <div className="flex flex-col items-center justify-center">
              <span className="w-full text-left text-lg">Upload Document</span>
              <span className="w-full text-left text-sm text-white/70">
                Supported Formats: PDF, Word
              </span>
            </div>
          </div>
          {file && (
            <div className="flex w-[375px] flex-col items-center justify-center rounded-lg border-2 bg-gray-100 p-5">
              <span className="w-full truncate overflow-hidden text-left text-lg font-semibold text-[#71717A]">
                {file.name}
              </span>
              <span className="w-[375px] truncate overflow-hidden px-5 text-left text-sm text-[#71717A]">
                {file.type === "application/pdf" ? "PDF" : "Word Document"}
              </span>
            </div>
          )}
        </div>
        <DialogFooter>
          <div className="flex w-full items-center justify-end gap-2.5">
            <Button
              disabled={isLoading}
              onClick={() => setOpen(false)}
              type="button"
              variant="secondary"
            >
              Cancel
            </Button>
            <Button
              disabled={isLoading}
              onClick={handleSubmit}
              type="button"
              variant="default"
            >
              {isLoading ? (
                <ChartCircle
                  size={20}
                  color="#FFFFFF"
                  className="animate-spin"
                />
              ) : (
                "Submit"
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddDocumentDialog;
