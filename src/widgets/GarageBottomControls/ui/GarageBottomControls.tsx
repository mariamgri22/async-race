import { useEffect } from 'react';

import { useDispatch, useSelector } from '@/app/redux/hooks';
import { carAPI, carActions, selectCar } from '@/etities/Car';
import { CarResponse, CarsParams } from '@/etities/Car/types/types';
import { winnerActions } from '@/etities/Winner';
import { Pagination } from '@/features/Pagination';
import { Total } from '@/shared/ui/Total/Total';

import styles from './GarageBottomControls.module.scss';

type Props = object;

export const GarageBottomControls = ({}: Props) => {
  const dispatch = useDispatch();
  const params = useSelector(selectCar.carsQueryParams);
  const { data, isSuccess, isLoading } = carAPI.useGetCarsQuery(params);
  const carsServer = data?.data;
  const carClientIDs = useSelector(selectCar.carIDs);
  const carClient = useSelector(selectCar.cars) || {};
  const currentPage = params[CarsParams.PAGE];
  const limit = params[CarsParams.LIMIT];
  const totalCount = data?.totalCount;

  useEffect(() => {
    if (isLoading || !isSuccess) return;
    if (!carsServer || !carClientIDs) return;
    if (carClientIDs.length === carsServer.length && carsServer.every((car) => car.id in carClient))
      return;
    dispatch(carActions.setCars(carsServer as CarResponse[]));
    dispatch(winnerActions.mutateCurrentWinner(null));
    dispatch(winnerActions.setCurrentRaceStartTime(null));
  }, [isLoading, carsServer, dispatch]);

  return (
    <section className={styles.section}>
      <Total entity="Cars" total={totalCount || 0} />
      <Pagination
        currentPage={currentPage || 1}
        limit={limit || 1}
        totalCount={totalCount || 1}
        scrollPage={(page: number) => {
          dispatch(carActions.mutateCarsQueryParams({ [CarsParams.PAGE]: page }));
        }}
      />
    </section>
  );
};
