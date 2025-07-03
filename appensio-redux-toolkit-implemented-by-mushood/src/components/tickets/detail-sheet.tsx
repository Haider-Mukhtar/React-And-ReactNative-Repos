import { type Dispatch, type SetStateAction, useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { ChartCircle } from "iconsax-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { cn } from "@/lib/utils";
import {
  useGetTicketQuery,
  useUpdateTicketMutation,
} from "@/store/services/ticket";

import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { Textarea } from "../ui/textarea";

interface DetailSheetProps {
  id?: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const ticketSchema = z.object({
  status: z.enum(["open", "in progress", "resolved"], {
    invalid_type_error: "Status must be one of open, in progress, or resolved",
  }),
  comment: z.string().trim(),
});

const DetailSheet = ({ id, open, setOpen }: DetailSheetProps) => {
  const { data } = useGetTicketQuery(`${id}`, {
    skip: !id,
    refetchOnMountOrArgChange: true,
  });

  const [updateTicket, { isLoading }] = useUpdateTicketMutation();

  const form = useForm<z.infer<typeof ticketSchema>>({
    resolver: zodResolver(ticketSchema),
    defaultValues: {
      status: "open",
      comment: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof ticketSchema>) => {
    const response = await updateTicket({
      ticket_id: id!,
      body: {
        comment: data.comment,
        status: data.status,
      },
    });

    if (response.data) {
      toast.success("Ticket Updated Successfully!");
      setOpen(false);
    } else {
      toast.error("Something went wrong, Please try again!");
    }
  };

  useEffect(() => {
    if (data) {
      form.setValue("comment", data.comment);
      form.setValue(
        "status",
        data.ticket_status as "open" | "in progress" | "resolved"
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="rounded-l-3xl sm:min-w-[500px]">
        <SheetHeader>
          <SheetTitle className="text-primary p-1.5 text-[28px] leading-[28px] font-bold md:text-[36px] md:leading-[36px]">
            Ticket Preview
          </SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex h-full w-full flex-col items-start justify-start"
          >
            <div className="grid w-full grid-cols-2 items-center justify-center gap-5 p-5">
              <hr className="col-span-2 w-full border-t" />
              <span className="flex-1 text-left text-lg font-bold">
                {data?.business_name}
              </span>
              <div className="flex items-center justify-center gap-5">
                <span className="text-sm text-[#71717A]">Status:</span>
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl className="w-full">
                          <SelectTrigger
                            className={cn("border-2 font-semibold capitalize", {
                              "border-red-500 text-red-500":
                                form.watch("status") === "open",
                              "border-green-500 text-green-500":
                                form.watch("status") === "resolved",
                              "border-yellow-500 text-yellow-500":
                                form.watch("status") === "in progress",
                            })}
                          >
                            <SelectValue placeholder="Select a Product Type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {["open", "in progress", "resolved"].map(
                            (item, idx) => (
                              <SelectItem
                                key={idx}
                                value={item}
                                className="capitalize"
                              >
                                {item}
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <hr className="col-span-2 w-full border-t" />
              <span className="flex-1 text-left text-sm text-[#71717A]">
                Business Type/Industry:
              </span>
              <span className="flex-1 text-right font-semibold">
                {data?.business_industry}
              </span>
              <hr className="col-span-2 w-full border-t" />
              <div className="col-span-2 flex w-full flex-col items-center justify-center gap-2.5">
                <span className="w-full text-left text-lg font-bold">
                  Problem
                </span>
                <span className="w-full text-left text-sm text-[#71717A]">
                  {data?.problem}
                </span>
              </div>
              <hr className="col-span-2 w-full border-t" />
              <div className="col-span-2 flex w-full flex-col items-center justify-center gap-2.5">
                <span className="w-full text-left text-lg font-bold">
                  Comment
                </span>
                <FormField
                  control={form.control}
                  name="comment"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl className="w-full">
                        <Textarea placeholder="Enter Comment" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="col-span-2 flex w-full items-center justify-end gap-2 p-5">
                <Button
                  onClick={() => setOpen(false)}
                  type="button"
                  variant="secondary"
                >
                  Cancel
                </Button>
                <Button disabled={isLoading} type="submit" variant="default">
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
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default DetailSheet;
