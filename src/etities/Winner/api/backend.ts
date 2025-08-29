import { API_TAGS, backendAPI } from '@/app/redux/api';
import { CarID } from '@/etities/Car';

import { WinnerRequest, WinnerResponse, winnersQueryParams } from './../types/types';
import type { FetchBaseQueryMeta } from '@reduxjs/toolkit/query';

const WINNERS_URL = 'winners';

const filterNullParams = (params: Partial<winnersQueryParams> | undefined) =>
  Object.fromEntries(Object.entries(params || {}).filter(([, value]) => value !== null));

const transformWinnersResponse = (response: WinnerResponse[], meta: FetchBaseQueryMeta) => {
  const totalCount = parseInt(meta?.response?.headers.get('X-Total-Count') || '0', 10);
  return { data: response, totalCount };
};

const buildWinnersQuery = (params: Partial<winnersQueryParams>) => ({
  url: WINNERS_URL,
  params: filterNullParams(params),
});

const buildPostWinnerQuery = (data: WinnerRequest) => ({
  url: WINNERS_URL,
  method: 'POST' as const,
  body: data,
});

const buildPutWinnerQuery = (data: WinnerRequest) => ({
  url: `${WINNERS_URL}/${data.id}`,
  method: 'PUT' as const,
  body: data,
});

const buildDeleteWinnerQuery = ({ id }: { id: CarID }) => ({
  url: `${WINNERS_URL}/${id}`,
  method: 'DELETE' as const,
});

export const winnerAPI = backendAPI.injectEndpoints({
  endpoints: (build) => ({
    getWinners: build.query<
      { data: WinnerResponse[]; totalCount: number },
      Partial<winnersQueryParams>
    >({
      query: buildWinnersQuery,
      transformResponse: transformWinnersResponse,
      providesTags: (result) =>
        result ? result.data.map(({ id }) => ({ type: API_TAGS.WINNER, id })) : [API_TAGS.WINNER],
    }),

    getWinner: build.query<WinnerResponse, CarID>({
      query: (id) => `${WINNERS_URL}/${id}`,
      providesTags: (_result, _error, id) => [{ type: API_TAGS.WINNER, id }],
    }),

    postWinner: build.mutation<WinnerResponse, WinnerRequest>({
      query: buildPostWinnerQuery,
      invalidatesTags: [{ type: API_TAGS.WINNER }],
    }),

    putWinner: build.mutation<WinnerResponse, WinnerRequest>({
      query: buildPutWinnerQuery,
      invalidatesTags: (_result, _error, { id }) => [{ type: API_TAGS.WINNER, id }],
    }),

    deleteWinner: build.mutation<void, { id: CarID }>({
      query: buildDeleteWinnerQuery,
      invalidatesTags: (_result, _error, { id }) => [{ type: API_TAGS.WINNER, id }],
    }),
  }),
});

export const {
  useGetWinnersQuery,
  useGetWinnerQuery,
  usePostWinnerMutation,
  usePutWinnerMutation,
  useDeleteWinnerMutation,
} = winnerAPI;
