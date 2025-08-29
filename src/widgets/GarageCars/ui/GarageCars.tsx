import { useRef } from 'react';
import { CarBodyAnimated, CarTitle } from '@/etities/Car';
import { CarDelete } from '@/features/CarDelete';
import { CarSelect } from '@/features/CarSelect';
import { EngineDrive } from '@/features/EngineDrive';
import { EngineStop } from '@/features/EngineStop';

import styles from './GarageCars.module.scss';
import { useGarageCars } from '../hooks/useGarageCars';

type Props = object;

export const GarageCars = ({}: Props) => {
  const { cars, carIDs, selectedID } = useGarageCars();
  const trackRef = useRef<HTMLDivElement>(null);
  const trackWidth = trackRef.current?.offsetWidth;

  if (!cars) return null;

  return (
    <ul className={styles.garage}>
      {carIDs?.map((id) => {
        if (!cars[id]) return null;

        return (
          <li key={id} className={styles.item}>
            <div className={styles.item__controls}>
              <CarSelect
                carID={id}
                isSelected={id === selectedID}
                className={styles.item__select}
              />
              <EngineDrive carID={id} className={styles.item__drive} />
              <CarDelete carID={id} className={styles.item__delete} />
              <EngineStop carID={id} className={styles.item__stop} />
            </div>
            <div className={styles.item__track} ref={trackRef}>
              <CarBodyAnimated car={cars[id]} trackWidth={trackWidth as number} />
              <CarTitle
                color={cars[id].color as string}
                title={cars[id].name as string}
                driveMode={cars[id]?.drive}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
};
