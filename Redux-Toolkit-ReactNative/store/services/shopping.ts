import { api } from "./core";

export const shoppingApi = api.injectEndpoints({
  endpoints: (build) => ({
    getShopping: build.query({
      query: () => ({
        url: "/api/get-shopping/",
        method: "GET",
      }),
      providesTags: ["Shoppings"],
      transformResponse: (response: ShoppingT[]) => response,
    }),
    deleteShopping: build.mutation({
      query: (id: number) => ({
        url: `/api/add-shopping/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Shoppings"],
    }),
    addShopping: build.mutation({
      query: ( addItem : Partial<ShoppingT> ) => ({
        url: `/api/add-shopping/`,
        method: "POST",
        body: addItem,
      }),
      invalidatesTags: ["Shoppings"],
    }),
    editShopping: build.mutation({
      query: ( editItem : Partial<ShoppingT> ) => ({
        url: `/api/edit-shopping/${editItem.id}/`,
        method: "PUT",
        body: editItem,
      }),
      invalidatesTags: ["Shoppings"],
    }),
  }),
});

export const {
  useGetShoppingQuery,
  useAddShoppingMutation,
  useDeleteShoppingMutation,
  useEditShoppingMutation,
} = shoppingApi;