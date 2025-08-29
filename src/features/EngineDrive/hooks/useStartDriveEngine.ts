import { useCallback, useState } from 'react';

import { useDispatch } from '@/app/redux/hooks';
import { CarID, carActions } from '@/etities/Car';
import { EngineDriveMode, engineAPI } from '@/etities/Engine';

type Props = {
  carID: CarID;
};

export function useStartDriveEngine({ carID }: Props) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const [startEngine] = engineAPI.useStartEngineMutation();
  const [driveEngine] = engineAPI.useDriveEngineMutation();

  const startDriveEngine = useCallback(async () => {
    setIsLoading(true);

    try {
      await startEngine({ id: carID })
        .unwrap()
        .then((spec) => dispatch(carActions.mutateCar({ id: carID, ...spec })))
        .catch(() => dispatch(carActions.mutateCar({ id: carID, drive: EngineDriveMode.BROKEN })));

      dispatch(carActions.mutateCar({ id: carID, drive: EngineDriveMode.DRIVE }));

      await driveEngine({ id: carID })
        .unwrap()
        .catch(() => dispatch(carActions.mutateCar({ id: carID, drive: EngineDriveMode.BROKEN })));
    } catch (error) {
      console.error('useStartDriveEngine error:', error);
    } finally {
      setIsLoading(false);
    }
  }, [startEngine, driveEngine, carID]);

  return {
    startDriveEngine,
    isLoading,
  };
}
