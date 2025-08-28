import { createSelector } from '@reduxjs/toolkit';

import { StateSchema } from '@/app/redux/store';

import { CarID } from '..';

export const selectCar = {
  selected: (state: StateSchema) => state.car.carSelected,
  carIDs: (state: StateSchema) => state.car.carIDs,
  cars: (state: StateSchema) => state.car.cars,
  car: (id?: CarID) => (state: StateSchema) => (state.car.cars && id ? state.car.cars[id] : null),
  isAnyInDrive: createSelector(
    (state: StateSchema) => state.car.cars,
    (cars) => (cars ? Object.values(cars).some((car) => car.drive) : false)
  ),
  carsQueryParams: (state: StateSchema) => state.car.carsQueryParams,
};
