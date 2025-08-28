import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { InitialState, WinnerRequest, WinnersParams, winnersQueryParams } from '../types/types';

const initialState: InitialState = {
  currentWinner: null,
  isCurrentWinnerPosted: null,
  currentRaceStartTime: null,
  currentRaceFirstFinishTime: null,
  winnersQueryParams: {
    [WinnersParams.PAGE]: 1,
    [WinnersParams.LIMIT]: 10,
    [WinnersParams.SORT]: null,
    [WinnersParams.ORDER]: null,
  },
};

const MILLISECONDS_IN_SECOND = 1000;

const winnerSlice = createSlice({
  name: 'winner',
  initialState,
  reducers: {
    setCurrentRaceStartTime: (state, action: PayloadAction<number | null>) => {
      state.currentRaceStartTime = action.payload;
    },

    mutateCurrentWinner: (
      state,
      action: PayloadAction<(WinnerRequest & { carFinishTime: number }) | null>
    ) => {
      //reset winner at any time
      if (action.payload === null) {
        state.currentWinner = null;
        return;
      }

      // if the winner is already defined, do nothing
      if (state.currentWinner?.time) return;

      // set the first competitor as the winner
      const { id, carFinishTime } = action.payload;
      if (id && state.currentWinner === null && carFinishTime && state.currentRaceStartTime) {
        const time = (carFinishTime - state.currentRaceStartTime) / MILLISECONDS_IN_SECOND; // best time revised while post/put the winner in usePostPutWinner
        const wins = 1; // wins amount revised while post/put the winner in usePostPutWinner
        state.currentWinner = { id, wins, time };
        state.isCurrentWinnerPosted = false;
      }
    },

    setIsCurrentWinnerPosted: (state, action: PayloadAction<boolean | null>) => {
      state.isCurrentWinnerPosted = action.payload;
    },

    mutateWinnersQueryParams: (state, action: PayloadAction<Partial<winnersQueryParams>>) => {
      state.winnersQueryParams = { ...state.winnersQueryParams, ...action.payload };
    },
  },
});

export const winnerActions = winnerSlice.actions;
export const winnerReducer = winnerSlice.reducer;
