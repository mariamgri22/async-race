import { useCallback, useState } from 'react';

import { useDispatch } from '@/app/redux/hooks';
import { CarID, carActions } from '@/etities/Car';
import { EngineDriveMode, engineAPI } from '@/etities/Engine';

type Props = {
  carID: CarID;
};

export function useStartDriveEngine({ carID }: Props) {
  // 0. Init

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const [startEngine] = engineAPI.useStartEngineMutation();
  const [driveEngine] = engineAPI.useDriveEngineMutation();

  // 1. Actions

  const startDriveEngine = useCallback(async () => {
    setIsLoading(true);

    try {
      // wait for an engine specifications
      await startEngine({ id: carID })
        .unwrap()
        .then((spec) => dispatch(carActions.mutateCar({ id: carID, ...spec })))
        .catch(() => dispatch(carActions.mutateCar({ id: carID, drive: EngineDriveMode.BROKEN })));

      // start a car's animation, before server response on drive mode, no winner calculation
      dispatch(carActions.mutateCar({ id: carID, drive: EngineDriveMode.DRIVE }));

      // if server response error, set drive mode to broken
      await driveEngine({ id: carID })
        .unwrap()
        .catch(() => dispatch(carActions.mutateCar({ id: carID, drive: EngineDriveMode.BROKEN })));
    } catch (error) {
      console.error('useStartDriveEngine error:', error);
    } finally {
      setIsLoading(false);
    }
  }, [startEngine, driveEngine, carID]);

  // Return

  return {
    startDriveEngine,
    isLoading,
  };
}
