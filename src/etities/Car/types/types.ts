import { EngineDriveMode, EngineResponse } from '@/etities/Engine';
import { ColorHEXString } from '@/shared/types/types';

export type CarID = number;

export type CarRequest = {
  name?: string;
  color?: ColorHEXString;
};

export type CarResponse = CarRequest & {
  id: CarID;
};

export type CarEngineData = CarResponse &
  EngineResponse & {
    drive?: EngineDriveMode | null;
    translateX?: number | string | null;
  };

export type InitialState = {
  carSelected: CarEngineData | null;
  cars: {
    [id: CarID]: CarEngineData;
  } | null;
  carIDs: CarID[] | null; // <-- use it for iteration and ordering
  carsQueryParams: CarsQueryParams;
};

export enum CarsParams {
  PAGE = '_page',
  LIMIT = '_limit',
}

export type CarsQueryParams = {
  [CarsParams.PAGE]: number | null;
  [CarsParams.LIMIT]: number | null;
};
