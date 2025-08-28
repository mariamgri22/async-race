import { backendAPI } from '@/app/redux/api';
import { API_TAGS } from '@/app/redux/api';

import { CarID, CarRequest, CarResponse } from '../types/types';

import { CarsQueryParams } from './../types/types';

const GARAGE_URL = 'garage';

export const carAPI = backendAPI.injectEndpoints({
  endpoints: (build) => ({
    getCars: build.query<{ data: CarResponse[]; totalCount: number }, Partial<CarsQueryParams>>({
      query: (params) => ({
        url: GARAGE_URL,
        params: Object.fromEntries(
          Object.entries(params || {}).filter(([, value]) => value !== null)
        ),
      }),
      transformResponse: (response: CarResponse[], meta) => {
        const totalCount = parseInt(meta?.response?.headers.get('X-Total-Count') || '0', 10);
        return { data: response, totalCount };
      },
      providesTags: (result) =>
        result ? result.data.map(({ id }) => ({ type: API_TAGS.CAR, id })) : [API_TAGS.CAR],
    }),

    getCar: build.query<CarResponse, CarID>({
      query: (id) => `${GARAGE_URL}/${id}`,
      providesTags: (_result, _error, id) => [{ type: API_TAGS.CAR, id }],
    }),

    postCar: build.mutation<CarResponse, CarRequest>({
      query: (car) => ({
        url: GARAGE_URL,
        method: 'POST',
        body: car,
      }),
      invalidatesTags: [{ type: API_TAGS.CAR }],
    }),

    updateCar: build.mutation<CarResponse, { id: CarID; data: CarRequest }>({
      query: ({ id, data }) => ({
        url: `${GARAGE_URL}/${id}`,
        method: 'PUT',
        body: data,
      }),
    }),

    deleteCar: build.mutation<void, { id: CarID }>({
      query: ({ id }) => ({
        url: `${GARAGE_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: API_TAGS.CAR }],
    }),
  }),
});
