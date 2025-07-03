import type { Dispatch, SetStateAction } from "react";

import { type ClassValue, clsx } from "clsx";
import { Briefcase, BrifecaseTick, CallCalling } from "iconsax-react";
import mammoth from "mammoth";
import {
  GlobalWorkerOptions,
  type PDFDocumentProxy,
  getDocument,
} from "pdfjs-dist";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

import { type ChartConfig } from "@/components/ui/chart";

GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/5.0.375/pdf.worker.min.mjs";
const mammothTyped = mammoth as unknown as {
  extractRawText: (options: {
    arrayBuffer: ArrayBuffer;
  }) => Promise<{ value: string }>;
};

function readFileAsArrayBuffer(file: File): Promise<ArrayBuffer> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () =>
      reader.result
        ? resolve(reader.result as ArrayBuffer)
        : reject(new Error("FileReader failed"));
    // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
    reader.onerror = () => reject(reader.error);
    reader.readAsArrayBuffer(file);
  });
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateCallDistributionConfig(
  data: CallDistribution[]
): ChartConfig | null {
  if (!data || data.length === 0) return null;

  const entries = data.map((item, idx) => {
    const key = item.business.replace(" ", "_").toLowerCase();
    const label =
      item.business.charAt(0).toUpperCase() + item.business.slice(1);
    const color = `var(--chart-${idx + 1})`;
    return [key, { label, color }] as const;
  });

  return Object.fromEntries(entries) as ChartConfig;
}

export function cleanPieData(data: CallDistribution[]) {
  if (!data || data.length === 0) return null;

  return data.map((item, idx) => ({
    ...item,
    fill: `var(--chart-${idx + 1})`,
    business: item.business.replace(" ", "_").toLowerCase(),
  }));
}

export function formatDashboardStats(data: DashboardStats) {
  return [
    {
      id: 1,
      name: "Total Agents",
      amount: data.total_businesses,
      icon: Briefcase,
    },
    {
      id: 2,
      name: "Active Agents",
      amount: data.active_businesses,
      icon: BrifecaseTick,
    },
    {
      id: 3,
      name: "Total Minutes",
      amount: data.calls_today,
      icon: CallCalling,
    },
  ];
}

export function formatBusinessStats(data: BusinessStats) {
  return [
    {
      id: 1,
      name: "Total Number of Calls",
      amount: data.totalCalls,
      icon: CallCalling,
    },
    {
      id: 2,
      name: "Number of Success Calls",
      amount: data.successCalls,
      icon: CallCalling,
    },
    {
      id: 3,
      name: "Number of Failed Calls",
      amount: data.failedCalls,
      icon: CallCalling,
    },
  ];
}

export function formatTicketStats(data: TicketStats) {
  return [
    {
      id: 1,
      name: "Total Tickets",
      amount: data.total_tickets,
      icon: CallCalling,
    },
    {
      id: 2,
      name: "Resolved Tickets",
      amount: data.resolved_tickets,
      icon: CallCalling,
    },
    {
      id: 3,
      name: "Open Tickets",
      amount: data.open_tickets,
      icon: CallCalling,
    },
  ];
}

export async function copyToClipboard(text: string): Promise<boolean> {
  if (!text) {
    return false;
  }

  if (
    navigator.clipboard &&
    typeof navigator.clipboard.writeText === "function"
  ) {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied to Clipboard!");
      return true;
    } catch (err) {
      toast.error((err as Error).message);
    }
  }

  try {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.top = "-9999px";
    document.body.appendChild(textarea);

    textarea.focus();
    textarea.select();

    const successful = document.execCommand("copy");
    document.body.removeChild(textarea);

    if (!successful) {
      toast.error("copyToClipboard: execCommand('copy') returned false");
    }

    toast.success("Copied to Clipboard!");
    return successful;
  } catch (err) {
    toast.error((err as Error).message);
    return false;
  }
}

export function truncateString(str: string, num: number) {
  return str.length > num ? `${str.slice(0, num)}...` : str;
}

export async function fetchCountryFromIP(
  setter: Dispatch<SetStateAction<string | null>>
) {
  const response = await fetch(
    `https://api.ipgeolocation.io/ipgeo?apiKey=${import.meta.env.VITE_IPGEOLOCATION_KEY}`
  );

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const data: {
    country_code2: string;
  } = await response.json();

  setter(data.country_code2);
}

export async function extractTextFromFile(file: File): Promise<string> {
  const buffer = await readFileAsArrayBuffer(file);
  const ext = file.name.split(".")?.pop()?.toLowerCase();

  if (ext === "pdf") {
    const pdf: PDFDocumentProxy = await getDocument({ data: buffer }).promise;
    let fullText = "";
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();

      fullText += `${content.items
        .map((item) => ("str" in item ? item.str : ""))
        .join(" ")}\n\n`;
    }
    return fullText;
  }

  if (ext === "docx") {
    const result = await mammothTyped.extractRawText({ arrayBuffer: buffer });
    return result.value;
  }

  throw new Error(`Unsupported file type: .${ext}`);
}
