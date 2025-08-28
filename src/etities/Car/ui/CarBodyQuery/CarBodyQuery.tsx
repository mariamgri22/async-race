import CarIcon from '@/shared/assets/icons/car.svg?react';

import { carAPI } from '../../api/backend';
import { CarID } from '../../types/types';

import styles from './CarBodyQuery.module.scss';

type Props = {
  carID: CarID;
};

export const CarBodyQuery = ({ carID }: Props) => {
  // 0. Init

  const { data: car } = carAPI.useGetCarQuery(carID);

  // 2. Render

  if (!car) return null;

  return (
    <div className={styles.car} style={{ color: car.color }}>
      <CarIcon className={styles.car__icon} />
    </div>
  );
};
