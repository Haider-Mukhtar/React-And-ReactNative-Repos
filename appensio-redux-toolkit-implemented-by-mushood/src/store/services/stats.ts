import { api } from "./core";

export const statsApi = api.injectEndpoints({
  endpoints: (build) => ({
    callVolumeData: build.query({
      query: (timestamp: string) => ({
        url: `/developer/vapi/get-call-volumes?timestamp=${timestamp}`,
        method: "GET",
      }),
      transformResponse: (response: CallVolume[]) => response,
    }),
    usageData: build.query({
      query: (timestamp: string) => ({
        url: `/developer/vapi/get-usage-analysis?timeframe=${timestamp}`,
        method: "GET",
      }),
      transformResponse: (response: Usage[]) => response,
    }),
    callDistributionData: build.query({
      query: () => ({
        url: "/developer/vapi/get-calls-distribution",
        method: "GET",
      }),
      transformResponse: (response: CallDistribution[]) => response,
    }),
    activeBusinesses: build.query({
      query: () => ({
        url: "/developer/vapi/get-active-businesses",
        method: "GET",
      }),
      transformResponse: (response: ActiveBusinesses[]) => response,
    }),
    dashboardStats: build.query({
      query: () => ({
        url: "/developer/vapi/get-dashboard-details",
        method: "GET",
      }),
      transformResponse: (response: DashboardStats) => response,
    }),
    businessStats: build.query({
      query: () => ({
        url: "/developer/vapi/get-dashboard-call-details",
        method: "GET",
      }),
      transformResponse: (response: BusinessStats) => response,
    }),
  }),
});

export const {
  useUsageDataQuery,
  useBusinessStatsQuery,
  useDashboardStatsQuery,
  useCallVolumeDataQuery,
  useActiveBusinessesQuery,
  useCallDistributionDataQuery,
} = statsApi;
