import { useCallback, useState } from 'react';

import { useDispatch } from '@/app/redux/hooks';
import { CarID, carActions } from '@/etities/Car';
import { EngineDriveMode, engineAPI } from '@/etities/Engine';
import { winnerActions } from '@/etities/Winner';

type Props = {
  carIDs: CarID[];
};

export function useStartDriveEngineList({ carIDs }: Props) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const [startEngine] = engineAPI.useStartEngineMutation();
  const [driveEngine] = engineAPI.useDriveEngineMutation();

  const startDriveEngineList = useCallback(async () => {
    setIsLoading(true);
    try {
      await Promise.all(
        carIDs.map((id) =>
          startEngine({ id })
            .unwrap()
            .then((spec) => dispatch(carActions.mutateCar({ id, ...spec })))
            .catch(() => dispatch(carActions.mutateCar({ id, drive: EngineDriveMode.BROKEN })))
        )
      );
      dispatch(winnerActions.setCurrentRaceStartTime(Date.now()));
      carIDs.forEach((id) => dispatch(carActions.mutateCar({ id, drive: EngineDriveMode.DRIVE })));

      await Promise.all(
        carIDs.map((id) =>
          driveEngine({ id })
            .unwrap()
            .catch(() => dispatch(carActions.mutateCar({ id, drive: EngineDriveMode.BROKEN })))
        )
      );
    } catch (error) {
      console.error('useStartDriveEngineList error:', error);
    } finally {
      setIsLoading(false);
    }
  }, [startEngine, driveEngine, carIDs]);

  return {
    startDriveEngineList,
    isLoading,
  };
}
