import { useCallback, useState } from 'react';

import { useDispatch } from '@/app/redux/hooks';
import { CarID, carActions } from '@/etities/Car';
import { EngineDriveMode, engineAPI } from '@/etities/Engine';
import { winnerActions } from '@/etities/Winner';

type Props = {
  carID: CarID;
};

export function useStopEngine({ carID }: Props) {
  // 0. Init

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [stop] = engineAPI.useStopEngineMutation();

  // 1. Actions

  const stopEngine = useCallback(() => {
    setIsLoading(true);

    stop({ id: carID })
      .unwrap()
      .catch(console.log)
      .finally(() => {
        dispatch(
          carActions.mutateCar({
            id: carID,
            drive: EngineDriveMode.RESET,
          })
        );
        setIsLoading(false);
      });

    dispatch(winnerActions.mutateCurrentWinner(null));
    dispatch(winnerActions.setCurrentRaceStartTime(null));
  }, [stop, carID]);

  // Return

  return {
    stopEngine,
    isLoading,
  };
}
