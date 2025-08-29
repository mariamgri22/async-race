import { useRef } from 'react';
import { CarEngineData } from '../types/types';
import { useDriveAnimation } from './useDriveAnimation';
import { useBrokenAnimation } from './useBrokenAnimation';
import { useResetAnimation } from './useResetAnimation';

export const useCarAnimation = (car: CarEngineData, trackWidth: number) => {
  const carRef = useRef<HTMLDivElement | null>(null);
  const distance = carRef.current ? trackWidth - carRef.current.offsetWidth : 0;

  const animationIdRef = useDriveAnimation(car, distance, carRef);
  useBrokenAnimation(car, carRef, animationIdRef);
  useResetAnimation(car, carRef, animationIdRef);

  return carRef;
};
