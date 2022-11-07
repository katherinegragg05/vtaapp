import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const requestsAdapter = createEntityAdapter({
  sortComparer: false,
});

const initialState = requestsAdapter.getInitialState();

export const requestsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRequests: builder.query({
      query: () => ({
        url: "/api/requests/get-all",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData) => {
        const loadedRequests = responseData.map((request) => {
          request.id = request._id;
          return request;
        });
        return requestsAdapter.setAll(initialState, loadedRequests);
      },
      providesTags: (result, error, arg) => {
        console.log(result);
        if (result?.ids) {
          return [
            { type: "Request", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Request", id })),
          ];
        } else return [{ type: "Request", id: "LIST" }];
      },
    }),
    addNewRequest: builder.mutation({
      query: (initialRequest) => ({
        url: "/api/requests/create",
        method: "POST",
        body: {
          ...initialRequest,
        },
      }),
      invalidatesTags: [{ type: "Request", id: "LIST" }],
    }),
    // updateNote: builder.mutation({
    //   query: (initialNote) => ({
    //     url: "/api/notes",
    //     method: "PATCH",
    //     body: {
    //       ...initialNote,
    //     },
    //   }),
    //   invalidatesTags: (result, error, arg) => [{ type: "Note", id: arg.id }],
    // }),
    // deleteNote: builder.mutation({
    //   query: ({ id }) => ({
    //     url: `/api/notes`,
    //     method: "DELETE",
    //     body: { id },
    //   }),
    //   invalidatesTags: (result, error, arg) => [{ type: "Note", id: arg.id }],
    // }),
  }),
});

export const {
  useGetRequestsQuery,
  useAddNewRequestMutation,
  //   useUpdateNoteMutation,
  //   useDeleteNoteMutation,
} = requestsApiSlice;

// returns the query result object
export const selectRequestsResult =
  requestsApiSlice.endpoints.getRequests.select();

// creates memoized selector
const selectRequestsData = createSelector(
  selectRequestsResult,
  (requestsResult) => requestsResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllRequests,
  selectById: selectRequestById,
  selectIds: selectRequestIds,
  // Pass in a selector that returns the request slice of state
} = requestsAdapter.getSelectors(
  (state) => selectRequestsData(state) ?? initialState
);
