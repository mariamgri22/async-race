import CarIcon from '@/shared/assets/icons/car.svg?react';
import { CarEngineData } from '../../types/types';

import styles from './CarBodyAnimated.module.scss';
import { useCarAnimation } from '../../hooks/useCarAnimation';

type Props = {
  car: CarEngineData;
  trackWidth: number;
};

export const CarBodyAnimated = ({ car, trackWidth }: Props) => {
  const carRef = useCarAnimation(car, trackWidth);

  return (
    <div
      className={styles.car}
      style={{
        color: car.color,
        transform: car.translateX ? `translateX(${car.translateX}px)` : 'translateX(0px)',
      }}
      ref={carRef}
    >
      <CarIcon className={styles.car__icon} />
    </div>
  );
};
