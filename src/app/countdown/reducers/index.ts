import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Countdown } from 'src/app/shared/countdown.model';
import { CountdownActionTypes } from '../actions/countdown.actions';

export interface State {
    countdown: Countdown | null;
    loading: boolean;
    loaded: boolean;
    error: any;
}

export const initialState: State = {
    countdown: null,
    loading: false,
    loaded: false,
    error: null
};

export function reducer(
    state = initialState,
    action: any
): State {

    switch (action.type) {
      case CountdownActionTypes.LoadCountdown: {
        return {
          countdown: null,
          loading: true,
          loaded: false,
          error: null
        };
      }

      case CountdownActionTypes.LoadCountdownSuccess: {
        return {
          countdown: action.countdown,
          loading: false,
          loaded: true,
          error: null
        };
      }

      case CountdownActionTypes.LoadCountdownError: {
        return {
          countdown: null,
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

export const getCountdownsState = createFeatureSelector<State>('countdown');

export const getCountdownSelector = (state: State) => state.countdown;

export const getLoadedSelector = (state: State) => state.loaded;

export const getLoadingSelector = (state: State) => state.loading;

export const getCountdown = createSelector(
  getCountdownsState,
  getCountdownSelector
);

export const getLoaded = createSelector(
  getCountdownsState,
  getLoadedSelector
);

export const getLoading = createSelector(
  getCountdownsState,
  getLoadingSelector
);
