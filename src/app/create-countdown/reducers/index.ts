import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Countdown } from 'src/app/shared/countdown.model';
import { CreateCountdownActionTypes } from '../actions/create-countdown.actions';

export interface State {
  countdown: Countdown | null;
  posting: boolean;
  posted: boolean;
  error: any;
}

export const initialState: State = {
  countdown: null,
  posting: false,
  posted: false,
  error: null
};

export function reducer(
    state = initialState,
    action: any
): State {

  switch (action.type) {
    case CreateCountdownActionTypes.PostCountdown: {
      return {
        ...state,
        posting: true,
        posted: false,
        error: null
      };
    }

    case CreateCountdownActionTypes.PostCountdownSuccess: {
      return {
        countdown: action.countdown,
        posting: false,
        posted: true,
        error: null
      };
    }

    case CreateCountdownActionTypes.PostCountdownError: {
      return {
        countdown: null,
        posting: false,
        posted: true,
        error: action.error
      };
    }

    case CreateCountdownActionTypes.Retry: {
      return initialState;
    }

    default: {
        return state;
    }
  }
}

export const getCountdownsState = createFeatureSelector<State>('create-countdown');

export const getCountdownSelector = (state: State) => state.countdown;

export const getPostingSelector = (state: State) => state.posting;

export const getPostedSelector = (state: State) => state.posted;

export const getErrorSelector = (state: State) => state.error;

export const getCountdown = createSelector(
  getCountdownsState,
  getCountdownSelector
);

export const getPosting = createSelector(
  getCountdownsState,
  getPostingSelector
);

export const getPosted = createSelector(
  getCountdownsState,
  getPostedSelector
);

export const getError = createSelector(
  getCountdownsState,
  getErrorSelector
);
