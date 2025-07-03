import { api } from "./core";

export const ticketApi = api.injectEndpoints({
  endpoints: (build) => ({
    getTickets: build.query({
      query: () => ({
        url: "/developer/support-tickets/",
        method: "GET",
      }),
      providesTags: ["Tickets"],
      transformResponse: (response: Ticket[]) => response,
    }),
    getTicketStats: build.query({
      query: () => ({
        url: "/developer/support-tickets/stats",
        method: "GET",
      }),
      providesTags: ["TicketStats"],
      transformResponse: (response: TicketStats) => response,
    }),
    getTicket: build.query({
      query: (ticket_id: string) => ({
        url: `/developer/support-tickets/${ticket_id}`,
        method: "GET",
      }),
      providesTags: ["Ticket"],
      transformResponse: (response: GetTicket) => response,
    }),
    updateTicket: build.mutation({
      query: ({
        ticket_id,
        body,
      }: {
        ticket_id: string;
        body: UpdateTicket;
      }) => ({
        url: `/developer/support-tickets/${ticket_id}/comment`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Ticket", "Tickets", "TicketStats"],
    }),
  }),
});

export const {
  useGetTicketsQuery,
  useGetTicketStatsQuery,
  useGetTicketQuery,
  useUpdateTicketMutation,
} = ticketApi;
