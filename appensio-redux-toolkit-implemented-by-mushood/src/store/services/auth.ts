import { setToken } from "../slices/global";
import { api } from "./core";

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: (data: PostLogin) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const result = (await queryFulfilled) as PostLoginResponse;
        dispatch(setToken(result.data.access_token));
      },
    }),
    resetBusinessPassword: build.mutation({
      query: ({
        password,
        confirm_password,
        business_id,
      }: {
        password: string;
        confirm_password: string;
        business_id: string;
      }) => ({
        url: `/auth/reset-password/${business_id}`,
        method: "POST",
        body: {
          password,
          confirm_password,
        },
      }),
    }),
  }),
});

export const { useLoginMutation, useResetBusinessPasswordMutation } = authApi;
