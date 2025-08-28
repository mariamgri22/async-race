import { StateSchema } from '@/app/redux/store';

export const selectWinner = {
  currentWinner: (state: StateSchema) => state.winner.currentWinner,
  isCurrentWinnerPosted: (state: StateSchema) => state.winner.isCurrentWinnerPosted,

  currentRaceStartTime: (state: StateSchema) => state.winner.currentRaceStartTime,
  currentRaceFirstFinishTime: (state: StateSchema) => state.winner.currentRaceFirstFinishTime,

  winnersQueryParams: (state: StateSchema) => state.winner.winnersQueryParams,
};
