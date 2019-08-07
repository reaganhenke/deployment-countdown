import { Action } from '@ngrx/store';
import { Countdown } from 'src/app/shared/countdown.model';

export enum CountdownActionTypes {
  LoadCountdown = '[Countdown] Load Countdown',
  LoadCountdownError = '[Countdown] Load Countdown Error',
  LoadCountdownSuccess = '[Countdown] Load Countdown Success'
}

export class LoadCountdown implements Action {
  readonly type = CountdownActionTypes.LoadCountdown;
  constructor(public id: string) {}
}

export class LoadCountdownError implements Action {
  readonly type = CountdownActionTypes.LoadCountdownError;
  constructor(public error: any) {}
}

export class LoadCountdownSuccess implements Action {
  readonly type = CountdownActionTypes.LoadCountdownSuccess;
  constructor(public countdown: Countdown) {}
}

export type ActionTypes =
  LoadCountdown
  | LoadCountdownError
  | LoadCountdownSuccess;
