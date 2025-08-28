import { useCallback, useState } from 'react';

import { useDispatch } from '@/app/redux/hooks';
import { CarID, carActions } from '@/etities/Car';
import { EngineDriveMode, engineAPI } from '@/etities/Engine';
import { winnerActions } from '@/etities/Winner';

type Props = {
  carIDs: CarID[];
};

export function useStartDriveEngineList({ carIDs }: Props) {
  // 0. Init

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const [startEngine] = engineAPI.useStartEngineMutation();
  const [driveEngine] = engineAPI.useDriveEngineMutation();

  // 1. Actions

  const startDriveEngineList = useCallback(async () => {
    setIsLoading(true);

    try {
      // wait for all engines specifications
      await Promise.all(
        carIDs.map((id) =>
          startEngine({ id })
            .unwrap()
            .then((spec) => dispatch(carActions.mutateCar({ id, ...spec })))
            .catch(() => dispatch(carActions.mutateCar({ id, drive: EngineDriveMode.BROKEN })))
        )
      );

      // memorize start time to calculate the winner
      dispatch(winnerActions.setCurrentRaceStartTime(Date.now()));

      // start cars animation before server response on drive mode
      carIDs.forEach((id) => dispatch(carActions.mutateCar({ id, drive: EngineDriveMode.DRIVE })));

      // if server response error, set drive mode to broken
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

  // Return

  return {
    startDriveEngineList,
    isLoading,
  };
}
