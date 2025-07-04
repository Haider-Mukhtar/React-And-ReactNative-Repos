import { setToken, setUser } from "../slices/global";
import { api } from "./core";

export const authApi = api.injectEndpoints({
  // baseUrl: "/api/v1",
  endpoints: (build) => ({
    registerUser: build.mutation({
      query: (registerUserData: RegisterUserT) => ({
        url: "/api/register/",
        method: "POST",
        body: registerUserData,
      }),
    }),
    loginUser: build.mutation({
      query: (loginUserData: LoginUserT) => ({
        url: "/api/login/",
        method: "POST",
        body: loginUserData,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const result = (await queryFulfilled) as PostLoginResponse;
        dispatch(setToken(result.data.access));
        dispatch(setUser({
          id: result.data.data.user.id,
          username: result.data.data.user.username,
          email: result.data.data.user.email,
          image: result.data.data.user.image,
        }));
      },
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
} = authApi;