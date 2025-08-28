import { useCallback, useState } from 'react';

import { useDispatch } from '@/app/redux/hooks';
import { CarID, carActions } from '@/etities/Car';
import { EngineDriveMode, engineAPI } from '@/etities/Engine';
import { winnerActions } from '@/etities/Winner';

type Props = {
  carIDs: CarID[];
};

export function useStopEngineList({ carIDs }: Props) {
  // 0. Init

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [stopEngine] = engineAPI.useStopEngineMutation();

  // 1. Actions

  const stopEngineList = useCallback(() => {
    setIsLoading(true);

    try {
      Promise.all(
        carIDs.map((id) =>
          stopEngine({ id })
            .unwrap()
            .catch(console.log)
            .finally(() =>
              dispatch(
                carActions.mutateCar({
                  id,
                  drive: EngineDriveMode.RESET,
                })
              )
            )
        )
      );

      dispatch(winnerActions.mutateCurrentWinner(null));
      dispatch(winnerActions.setCurrentRaceStartTime(null));
    } catch (error) {
      console.error('useStopEngineList error:', error);
    } finally {
      setIsLoading(false);
    }
  }, [stopEngine, carIDs]);

  // Return

  return {
    stopEngineList,
    isLoading,
  };
}
