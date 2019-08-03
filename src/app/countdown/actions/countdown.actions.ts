import { Action } from '@ngrx/store';
import { Countdown } from '../countdown';

export const LOAD_COUNTDOWNS = '[Countdown] Load Countdowns';
export const LOAD_COUNTDOWN_ERROR = '[Countdown] Load Countdown Error';
export const LOAD_COUNTDOWN_SUCCESS = '[Countdown] Load Countdown Success';
export const POST_COUNTDOWN = '[Countdown] Post Countdown';


export class LoadCountdowns implements Action {
  readonly type = LOAD_COUNTDOWNS;

  constructor() {}
}

export class LoadCountdownsError implements Action {
  readonly type = LOAD_COUNTDOWN_ERROR;

  constructor(error: any) {}
}

export class LoadCountdownsSuccess implements Action {
  readonly type = LOAD_COUNTDOWN_SUCCESS;

  constructor(countdowns: Countdown[]) {}
}

export class PostCountdown implements Action {
  readonly type = POST_COUNTDOWN;

  constructor(public countdown: Countdown) {}
}

export type ActionTypes =
  LoadCountdowns
  | LoadCountdownsError
  | LoadCountdownsSuccess;
