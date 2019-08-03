import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Countdown } from '../countdown';
import { LOAD_COUNTDOWNS, LOAD_COUNTDOWN_SUCCESS, LOAD_COUNTDOWN_ERROR } from '../actions/countdown.actions';

export interface State {
    countdowns: Countdown[] | null;
    loading: boolean;
    loaded: boolean;
    error: any;
}

export const initialState: State = {
    countdowns: null,
    loading: false,
    loaded: false,
    error: null
};

export function reducer(
    state = initialState,
    action: any
): State {

    switch (action.type) {
      case LOAD_COUNTDOWNS: {
        return {
          ...state,
          loading: true,
          loaded: false,
          error: null
        };
      }

      case LOAD_COUNTDOWN_SUCCESS: {
        return {
          ...state,
          loading: false,
          loaded: true,
          countdowns: action.countdowns
        };
      }

      case LOAD_COUNTDOWN_ERROR: {
        return {
          ...state,
          loading: false,
          loaded: true,
          error: action.error
        };
      }

      default: {
          return state;
      }
    }

}

export const getCountdownsSelector = (state: State) => state.countdowns;

export const getCountdownsState = createFeatureSelector<State>('todos');

export const getCountdowns = createSelector(
  getCountdownsState,
  getCountdownsSelector
);
