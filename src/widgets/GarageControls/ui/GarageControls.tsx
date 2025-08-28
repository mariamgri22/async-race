import { CarCreate } from '@/features/CarCreate';
import { CarsGenerate } from '@/features/CarsGenerate';
import { CarsRace } from '@/features/CarsRace';
import { CarsReset } from '@/features/CarsReset';
import { CarUpdate } from '@/features/CarUpdate';

import styles from './GarageControls.module.scss';

type Props = object;

export const GarageControls = ({}: Props) => {
  return (
    <section className={styles.controls}>
      <div className={styles.play}>
        <CarsRace />
        <CarsReset />
      </div>
      <div className={styles.mutate}>
        <CarCreate />
        <CarUpdate />
      </div>
      <CarsGenerate className={styles.generate} />
    </section>
  );
};
