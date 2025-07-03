import { setBusiness, setTwilioNumber, setVapiId } from "../slices/global";
import { api } from "./core";

export const businessApi = api.injectEndpoints({
  endpoints: (build) => ({
    postBusinessInfo: build.mutation({
      query: (data: PostBusinessInfo) => ({
        url: "/developer/business/developer",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const result = (await queryFulfilled) as PostBusinessResponse;
        dispatch(
          setBusiness({
            phone: arg.contact_number,
            id: result.data.business_id,
            country: result.data.country,
            industry: result.data.industry,
            name: result.data.business_name,
          })
        );
      },
    }),
    assignTwilioNumber: build.mutation({
      query: (data: PostBusinessTwilioNumber) => ({
        url: "/developer/business/assign-twilio-number",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const result =
          (await queryFulfilled) as PostBusinessTwilioNumberResponse;
        dispatch(setTwilioNumber(result.data.twilio_number));
      },
    }),
    postBusinessAssistant: build.mutation({
      query: (data: PostVapiAssistant) => ({
        url: "/developer/vapi/",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const result = (await queryFulfilled) as PostVapiAssistantResponse;
        dispatch(setVapiId(result.data.vapi_id));
      },
    }),
    createVapiAssistant: build.mutation({
      query: (business_id: string) => ({
        url: `/developer/vapi/create-assistant/${business_id}`,
        method: "POST",
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        await queryFulfilled;
        localStorage.clear();
      },
    }),
    updateBusinessPrompt: build.mutation({
      query: (data: UpdateBusinessPrompt) => ({
        url: "/developer/vapi/update-system-prompt",
        method: "POST",
        body: data.data,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        void dispatch(
          businessApi.endpoints.createVapiAssistant.initiate(arg.business_id)
        );
      },
      invalidatesTags: ["Businesses"],
    }),
    getAllBusinesses: build.query({
      query: () => ({
        url: "/developer/business/all",
        method: "GET",
      }),
      providesTags: ["Businesses"],
      transformResponse: (response: Business[]) => response,
    }),
    deleteBusiness: build.mutation({
      query: (business_id: string) => ({
        url: `/developer/business/${business_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Businesses"],
    }),
    getBusiness: build.query({
      query: (business_id: string) => ({
        url: `/developer/business/${business_id}`,
        method: "GET",
      }),
      transformResponse: (response: BusinessDetails) => response,
      providesTags: ["Business"],
    }),
    updateBusinessVapi: build.mutation({
      query: (business_id: string) => ({
        url: `/developer/business/sync/${business_id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Business"],
    }),
    updateBusiness: build.mutation({
      query: ({
        business_id,
        data,
      }: {
        business_id: string;
        data: UpdateBusinessBody;
      }) => ({
        url: `/developer/business/${business_id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(
          setBusiness({
            id: arg.business_id,
            country: arg.data.country,
            industry: arg.data.industry,
            name: arg.data.business_name,
            phone: arg.data.contact_number,
          })
        );
        void dispatch(
          businessApi.endpoints.updateBusinessVapi.initiate(arg.business_id)
        );
      },
      invalidatesTags: ["Business"],
    }),
    getPromptTemplates: build.query({
      query: () => ({
        url: "/developer/vapi/get-prompt-templates",
        method: "GET",
      }),
      transformResponse: (response: PromptTemplate[]) => response,
    }),
    postBusinessHours: build.mutation({
      query: ({
        business_id,
        data,
      }: {
        business_id: string;
        data: BusinessHoursBody;
      }) => ({
        url: `/business-timing/${business_id}`,
        method: "POST",
        body: data,
      }),
    }),
    getBusinessHours: build.query({
      query: (business_id: string) => ({
        url: `/business-timing/${business_id}`,
        method: "GET",
      }),
      transformResponse: (response: BusinessHours) => response,
    }),
  }),
});

export const {
  useGetBusinessQuery,
  useGetAllBusinessesQuery,
  useGetBusinessHoursQuery,
  useDeleteBusinessMutation,
  useUpdateBusinessMutation,
  useGetPromptTemplatesQuery,
  usePostBusinessInfoMutation,
  usePostBusinessHoursMutation,
  useUpdateBusinessVapiMutation,
  useAssignTwilioNumberMutation,
  useCreateVapiAssistantMutation,
  useUpdateBusinessPromptMutation,
  usePostBusinessAssistantMutation,
} = businessApi;
