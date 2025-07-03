import { api } from "./core";

export const knowledgeApi = api.injectEndpoints({
  endpoints: (build) => ({
    getKnowledgeBase: build.query({
      query: (business_id: string) => ({
        url: `/business/${business_id}/knowledge`,
        method: "GET",
      }),
      providesTags: ["Knowledge"],
      transformResponse: (response: KnowledgeBase[]) => response,
    }),
    uploadDocument: build.mutation({
      query: ({
        business_id,
        body,
      }: {
        business_id: string;
        body: DocumentUpload;
      }) => ({
        url: `/business/${business_id}/knowledge/upload`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Knowledge"],
    }),
    deleteDocument: build.mutation({
      query: (document_id: string) => ({
        url: `/business/knowledge/${document_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Knowledge"],
    }),
  }),
});

export const {
  useGetKnowledgeBaseQuery,
  useUploadDocumentMutation,
  useDeleteDocumentMutation,
} = knowledgeApi;
