export { carAPI } from './api/backend';
export { CarBodyAnimated } from './ui/CarBodyAnimated/CarBodyAnimated';
export { CarBodyQuery } from './ui/CarBodyQuery/CarBodyQuery';
export { CarTitle } from './ui/CarTitle/CarTitle';
export { CarTitleQuery } from './ui/CarTitleQuery/CarTitleQuery';
export { carReducer, carActions } from './model/slice';
export { selectCar } from './model/selectors';
export type { CarRequest, CarResponse, CarID } from './types/types';
