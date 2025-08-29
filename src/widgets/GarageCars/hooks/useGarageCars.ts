// hooks/useGarageCars.ts
import { useEffect } from 'react';
import { useDispatch, useSelector } from '@/app/redux/hooks';
import { carAPI, carActions, selectCar, CarResponse } from '@/etities/Car';

export const useGarageCars = () => {
  const dispatch = useDispatch();
  const cars = useSelector(selectCar.cars);
  const carIDs = useSelector(selectCar.carIDs);
  const selectedID = useSelector(selectCar.selected)?.id;
  const carsQueryParams = useSelector(selectCar.carsQueryParams);

  const { data, isSuccess, isError } = carAPI.useGetCarsQuery(carsQueryParams);
  const carsServer = data?.data;

  useEffect(() => {
    if (isSuccess && !cars) {
      dispatch(carActions.setCars(carsServer as CarResponse[]));
    }
  }, [isSuccess, cars, dispatch, carsServer]);

  useEffect(() => {
    if (isError) {
      throw new Error('Error fetching cars. Check if mock server is running (see Readme.md).');
    }
  }, [isError]);

  return { cars, carIDs, selectedID };
};
