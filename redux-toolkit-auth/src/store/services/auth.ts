import { setToken, setUser } from "../slices/global";
import { api } from "./core";

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    registerUser: build.mutation({
      query: (registerUserData: RegisterUser) => ({
        url: "/users/register",
        method: "POST",
        body: registerUserData,
      }),
    }),
    loginUser: build.mutation({
      query: (loginUserData: LoginUser) => ({
        url: "/users/login",
        method: "POST",
        body: loginUserData,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const result = (await queryFulfilled) as PostLoginResponse;
        dispatch(setToken(result.data.data.token));
        dispatch(setUser({
          id: result.data.data.id,
          first_name: result.data.data.first_name,
          last_name: result.data.data.last_name,
          email: result.data.data.email,
          profile_picture: result.data.data.profile_picture,
        }));
      },
    }),

  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
} = authApi;