import type { ChartConfig } from "@/components/ui/chart";

export const callVolumeConfig = {
  totalCalls: {
    label: "Total Calls",
    color: "var(--chart-1)",
  },
  successCalls: {
    label: "Success Calls",
    color: "var(--chart-5)",
  },
  failedCalls: {
    label: "Failed Calls",
    color: "var(--chart-4)",
  },
} satisfies ChartConfig;

export const usageData = [
  { month: "Jan", total_minutes: 5 },
  { month: "Feb", total_minutes: 5 },
  { month: "Mar", total_minutes: 7 },
  { month: "Apr", total_minutes: 10 },
  { month: "May", total_minutes: 8 },
  { month: "Jun", total_minutes: 10 },
  { month: "Jul", total_minutes: 5 },
  { month: "Aug", total_minutes: 5 },
  { month: "Sep", total_minutes: 7 },
  { month: "Oct", total_minutes: 3 },
  { month: "Nov", total_minutes: 4 },
  { month: "Dec", total_minutes: 5 },
];

export const usageConfig = {
  totalMinutes: {
    label: "Total Minutes",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig;

export const callDistributionData = [
  { business: "retail", calls: 275, fill: "var(--color-retail)" },
  { business: "service", calls: 200, fill: "var(--color-service)" },
  { business: "food", calls: 287, fill: "var(--color-food)" },
  { business: "product", calls: 173, fill: "var(--color-product)" },
  { business: "other", calls: 190, fill: "var(--color-other)" },
];

export const callDistributionConfig = {
  calls: {
    label: "Calls",
  },
  retail: {
    label: "Retail",
    color: "var(--chart-1)",
  },
  service: {
    label: "Service",
    color: "var(--chart-2)",
  },
  food: {
    label: "Food",
    color: "var(--chart-3)",
  },
  product: {
    label: "Product",
    color: "var(--chart-4)",
  },
  other: {
    label: "Other",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig;
