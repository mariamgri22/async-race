import { useEffect, useRef } from 'react';

import { useDispatch } from '@/app/redux/hooks';
import { EngineDriveMode } from '@/etities/Engine';
import { winnerActions } from '@/etities/Winner';
import CarIcon from '@/shared/assets/icons/car.svg?react';

import { carActions } from '../../model/slice';
import { CarEngineData } from '../../types/types';

import styles from './CarBodyAnimated.module.scss';

type Props = {
  car: CarEngineData;
  trackWidth: number;
};

export const CarBodyAnimated = ({ car, trackWidth }: Props) => {
  // 0. Init

  const dispatch = useDispatch();

  const carRef = useRef<HTMLDivElement>(null);
  const animationIdRef = useRef<number | null>(null);
  const distance = carRef.current ? trackWidth - carRef.current.offsetWidth : 0;

  // 1. Animation

  function animateCar(currentTime: number, startTime: number) {
    const SLOWDOWN_RATIO = 50;
    const elapsedTime = currentTime - startTime;
    const requiredTime = (car.velocity as number) * SLOWDOWN_RATIO;

    const progress = Math.min(elapsedTime / requiredTime, 1);
    const translateX = progress * distance;

    if (carRef.current) {
      carRef.current.style.transform = `translateX(${translateX}px)`;
    }
    if (progress < 1) {
      animationIdRef.current = requestAnimationFrame((currentTime) =>
        animateCar(currentTime, startTime)
      );
    } else if (progress === 1) {
      dispatch(carActions.mutateCar({ id: car.id, translateX }));
      dispatch(winnerActions.mutateCurrentWinner({ id: car.id, carFinishTime: Date.now() }));
    }
  }

  // 1.1 Start animation
  useEffect(() => {
    if (!car.velocity || !carRef.current) return;
    if (car.drive === EngineDriveMode.DRIVE && !car.translateX) {
      const startTime = performance.now();
      animationIdRef.current = requestAnimationFrame((currentTime) =>
        animateCar(currentTime, startTime)
      );
    }
  }, [car.drive]);

  // 1.2 Stop animation
  useEffect(() => {
    if (!carRef.current) return;
    if (car.drive === EngineDriveMode.BROKEN && animationIdRef.current !== null) {
      dispatch(
        carActions.mutateCar({
          id: car.id,
          translateX: carRef.current.style.transform.replace(/[^0-9.]/g, ''),
        })
      );
      cancelAnimationFrame(animationIdRef.current);
    }
  }, [car.drive]);

  // 1.3 Reset animation
  useEffect(() => {
    if (!carRef.current) return;
    if (car.drive === EngineDriveMode.RESET) {
      carRef.current.style.transform = 'translateX(0)';
      if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
      dispatch(carActions.mutateCar({ id: car.id, drive: null, translateX: null }));
    }
  }, [car.drive]);

  // 2. Render

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
