import { useEffect, useRef } from 'react';
import { useDispatch } from '@/app/redux/hooks';
import { EngineDriveMode } from '@/etities/Engine';
import { winnerActions } from '@/etities/Winner';
import { carActions } from '../model/slice';
import { CarEngineData } from '../types/types';

const ANIMATION_DURATION = 50;

export const useDriveAnimation = (
  car: CarEngineData,
  distance: number,
  carRef: React.RefObject<HTMLDivElement | null>
) => {
  const dispatch = useDispatch();
  const animationIdRef = useRef<number | null>(null);

  const animateCar = (currentTime: number, startTime: number) => {
    const elapsedTime = currentTime - startTime;
    const requiredTime = (car.velocity as number) * ANIMATION_DURATION;
    const progress = Math.min(elapsedTime / requiredTime, 1);
    const translateX = progress * distance;

    if (carRef.current) {
      carRef.current.style.transform = `translateX(${translateX}px)`;
    }

    if (progress < 1) {
      animationIdRef.current = requestAnimationFrame((time) => animateCar(time, startTime));
    } else {
      dispatch(carActions.mutateCar({ id: car.id, translateX }));
      dispatch(winnerActions.mutateCurrentWinner({ id: car.id, carFinishTime: Date.now() }));
    }
  };

  useEffect(() => {
    if (car.drive === EngineDriveMode.DRIVE && car.velocity && !car.translateX && carRef.current) {
      const startTime = performance.now();
      animationIdRef.current = requestAnimationFrame((time) => animateCar(time, startTime));
    }
  }, [car.drive]);

  return animationIdRef;
};
