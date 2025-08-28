import { API_TAGS, backendAPI } from '@/app/redux/api';
import { CarID } from '@/etities/Car';

import { WinnerRequest, WinnerResponse, winnersQueryParams } from './../types/types';

const WINNERS_URL = 'winners';

export const winnerAPI = backendAPI.injectEndpoints({
  endpoints: (build) => ({
    getWinners: build.query<
      { data: WinnerResponse[]; totalCount: number },
      Partial<winnersQueryParams>
    >({
      query: (params) => ({
        url: WINNERS_URL,
        params: Object.fromEntries(
          Object.entries(params || {}).filter(([, value]) => value !== null)
        ),
      }),
      transformResponse: (response: WinnerResponse[], meta) => {
        const totalCount = parseInt(meta?.response?.headers.get('X-Total-Count') || '0', 10);
        return { data: response, totalCount };
      },
      providesTags: (result) =>
        result ? result.data.map(({ id }) => ({ type: API_TAGS.WINNER, id })) : [API_TAGS.WINNER],
    }),

    getWinner: build.query<WinnerResponse, CarID>({
      query: (id) => `${WINNERS_URL}/${id}`,
      providesTags: (_result, _error, id) => [{ type: API_TAGS.WINNER, id }],
    }),

    postWinner: build.mutation<WinnerResponse, WinnerRequest>({
      query: (data) => ({
        url: WINNERS_URL,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [{ type: API_TAGS.WINNER }],
    }),

    putWinner: build.mutation<WinnerResponse, WinnerRequest>({
      query: (data) => ({
        url: `${WINNERS_URL}/${data.id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: API_TAGS.WINNER, id }],
    }),

    deleteWinner: build.mutation<void, { id: CarID }>({
      query: ({ id }) => ({
        url: `${WINNERS_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: API_TAGS.WINNER, id }],
    }),
  }),
});
