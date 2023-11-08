import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const articleApi = createApi({
  reducerPath: "articleApi",

  baseQuery: fetchBaseQuery({
    baseUrl:
      "https://article-data-extraction-and-summarization.p.rapidapi.com/",
    prepareHeaders: (headers) => {
      headers.set(
        "X-RapidAPI-Key",
        "7c94d3fb93mshd6664c203127a98p14c4ecjsn9e630db5a6cc"
      );
      headers.set(
        "X-RapidAPI-Host",
        "article-data-extraction-and-summarization.p.rapidapi.com"
      );
      return headers;
    },
  }),

  endpoints: (builder) => ({
    getSummary: builder.query({
      query: (params) =>
        `/article?url=${encodeURIComponent(
          params.articleUrl
        )}&summarize= 'true'&summarize_language='auto'`,
    }),
  }),
});

export const { useLazyGetSummaryQuery } = articleApi;
