import { backendAPI } from '@/app/redux/api';
import { API_TAGS } from '@/app/redux/api';

import { CarID, CarRequest, CarResponse } from '../types/types';
import { CarsQueryParams } from './../types/types';
import { FetchBaseQueryMeta } from '@reduxjs/toolkit/query';

const GARAGE_URL = 'garage';

const filterNullParams = (params: Partial<CarsQueryParams> | undefined) =>
  Object.fromEntries(Object.entries(params || {}).filter(([, value]) => value !== null));

const transformCarsResponse = (response: CarResponse[], meta: FetchBaseQueryMeta) => {
  const totalCount = parseInt(meta?.response?.headers.get('X-Total-Count') || '0', 10);
  return { data: response, totalCount };
};

const provideCarTags = (result: { data: CarResponse[]; totalCount: number } | undefined) =>
  result ? result.data.map(({ id }) => ({ type: API_TAGS.CAR, id })) : [API_TAGS.CAR];

const buildCarQuery = (params: Partial<CarsQueryParams>) => ({
  url: GARAGE_URL,
  params: filterNullParams(params),
});

const buildCarUpdateQuery = ({ id, data }: { id: CarID; data: CarRequest }) => ({
  url: `${GARAGE_URL}/${id}`,
  method: 'PUT' as const,
  body: data,
});

const buildCarDeleteQuery = ({ id }: { id: CarID }) => ({
  url: `${GARAGE_URL}/${id}`,
  method: 'DELETE' as const,
});

export const carAPI = backendAPI.injectEndpoints({
  endpoints: (build) => ({
    getCars: build.query<{ data: CarResponse[]; totalCount: number }, Partial<CarsQueryParams>>({
      query: buildCarQuery,
      transformResponse: transformCarsResponse,
      providesTags: provideCarTags,
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
      query: buildCarUpdateQuery,
      invalidatesTags: [{ type: API_TAGS.CAR }],
    }),
    deleteCar: build.mutation<void, { id: CarID }>({
      query: buildCarDeleteQuery,
      invalidatesTags: [{ type: API_TAGS.CAR }],
    }),
  }),
});

export const {
  useGetCarsQuery,
  useGetCarQuery,
  usePostCarMutation,
  useUpdateCarMutation,
  useDeleteCarMutation,
} = carAPI;
