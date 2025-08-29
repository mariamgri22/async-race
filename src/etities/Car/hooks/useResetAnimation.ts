import { useEffect } from 'react';
import { useDispatch } from '@/app/redux/hooks';
import { EngineDriveMode } from '@/etities/Engine';
import { carActions } from '../model/slice';
import { CarEngineData } from '../types/types';

export const useResetAnimation = (
  car: CarEngineData,
  carRef: React.RefObject<HTMLDivElement | null>,
  animationIdRef: React.MutableRefObject<number | null>
) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (car.drive === EngineDriveMode.RESET && carRef.current) {
      carRef.current.style.transform = 'translateX(0)';
      if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
      dispatch(carActions.mutateCar({ id: car.id, drive: null, translateX: null }));
    }
  }, [car.drive]);
};
