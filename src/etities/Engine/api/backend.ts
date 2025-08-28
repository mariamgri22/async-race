import { backendAPI } from '@/app/redux/api';
import { CarID } from '@/etities/Car';

import { EngineResponse, EngineStatus } from '../types/types';

export const engineAPI = backendAPI.injectEndpoints({
  endpoints: (build) => ({
    startEngine: build.mutation<EngineResponse, { id: CarID }>({
      query: ({ id }) => ({
        url: `engine?id=${id}&status=${EngineStatus.STARTED}`,
        method: 'PATCH',
      }),
    }),

    driveEngine: build.mutation<EngineResponse, { id: CarID }>({
      query: ({ id }) => ({
        url: `engine?id=${id}&status=${EngineStatus.DRIVE}`,
        method: 'PATCH',
      }),
    }),

    stopEngine: build.mutation<EngineResponse, { id: CarID }>({
      query: ({ id }) => ({
        url: `engine?id=${id}&status=${EngineStatus.STOPPED}`,
        method: 'PATCH',
      }),
    }),
  }),
});
