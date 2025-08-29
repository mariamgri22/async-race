import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { useDispatch } from '@/app/redux/hooks';

import { winnerAPI } from '../api/backend';
import { selectWinner } from '../model/selectors';
import { winnerActions } from '../model/slice';

export function usePostPutWinner() {
  const winner = useSelector(selectWinner.currentWinner);
  const isCurrentWinnerPosted = useSelector(selectWinner.isCurrentWinnerPosted);
  const raceStartTime = useSelector(selectWinner.currentRaceStartTime);

  const dispatch = useDispatch();
  const {
    data: wonBeforeData,
    isSuccess: wonBeforeSuccess,
    isFetching: wonBeforeFetching,
  } = winnerAPI.useGetWinnerQuery(winner?.id as number, { skip: !winner?.id });
  const [postWinner] = winnerAPI.usePostWinnerMutation();
  const [putWinner] = winnerAPI.usePutWinnerMutation();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!winner || !raceStartTime || isCurrentWinnerPosted || wonBeforeFetching) return;
    setIsLoading(true);

    if (wonBeforeSuccess) {
      const totalWins = wonBeforeData.wins + 1;
      const bestTime = winner.time < wonBeforeData.time ? winner.time : wonBeforeData.time;
      putWinner({ id: winner.id, wins: totalWins, time: bestTime })
        .unwrap()
        .then(() => dispatch(winnerActions.setIsCurrentWinnerPosted(true)))
        .catch(() => dispatch(winnerActions.setIsCurrentWinnerPosted(false)))
        .finally(() => setIsLoading(false));
    } else {
      postWinner({ ...winner })
        .unwrap()
        .then(() => dispatch(winnerActions.setIsCurrentWinnerPosted(true)))
        .catch(() => dispatch(winnerActions.setIsCurrentWinnerPosted(false)))
        .finally(() => setIsLoading(false));
    }
  }, [winner, isCurrentWinnerPosted, wonBeforeSuccess, wonBeforeFetching, dispatch]);

  return { isLoading };
}
