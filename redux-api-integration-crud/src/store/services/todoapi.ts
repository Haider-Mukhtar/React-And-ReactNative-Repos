import { api } from "./core";

export const todoApi = api.injectEndpoints({
  endpoints: (build) => ({
    getTodos: build.query({
      query: () => ({
        url: "/todos/",
        method: "GET",
      }),
      providesTags: ["Todos"],
      transformResponse: (response: Todo[]) => response,
    }),
    uploadTodo: build.mutation({
      query: ({
        title,
        description,
      }: {
          title: string;
          description: string;
      }) => ({
        url: `/todos/`,
        method: "POST",
        body: {
          title,
          description,
        },
      }),
      invalidatesTags: ["Todos"],
    }),
    // uploadTodo: build.mutation({
    //   query: ({
    //     data,
    //   }: {
    //     data: { title: string; description: string };
    //   }) => ({
    //     url: `/todos/`,
    //     method: "POST",
    //     body: data,
    //   }),
    //   invalidatesTags: ["Todo"],
    // }),
    deleteTodo: build.mutation({
      query: (todo_id: string) => ({
        url: `/todos/${todo_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Todos"],
    }),
    updateTodo: build.mutation({
      query: ({
        todo_id,
        title,
        description,
      }: {
        todo_id: string;
        title: string;
        description: string;
      }) => ({
        url: `/todos/${todo_id}`,
        method: "PUT",
        body: {
          title,
          description,
        },
      }),
      invalidatesTags: ["Todos"],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useUploadTodoMutation,
  useDeleteTodoMutation,
  useUpdateTodoMutation
} = todoApi;