import { useEffect } from 'react';
import { useDispatch } from '@/app/redux/hooks';
import { EngineDriveMode } from '@/etities/Engine';
import { carActions } from '../model/slice';
import { CarEngineData } from '../types/types';

export const useBrokenAnimation = (
  car: CarEngineData,
  carRef: React.RefObject<HTMLDivElement | null>,
  animationIdRef: React.MutableRefObject<number | null>
) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (car.drive === EngineDriveMode.BROKEN && carRef.current && animationIdRef.current) {
      dispatch(
        carActions.mutateCar({
          id: car.id,
          translateX: carRef.current.style.transform.replace(/[^0-9.]/g, ''),
        })
      );
      cancelAnimationFrame(animationIdRef.current);
    }
  }, [car.drive]);
};
