import { Action } from '@ngrx/store';
import { Countdown } from 'src/app/shared/countdown.model';

export enum CreateCountdownActionTypes {
  PostCountdown = '[Create Countdown] PostCountdown',
  PostCountdownSuccess = '[Create Countdown] PostCountdownSuccess',
  PostCountdownError = '[Create Countdown] PostCountdownError'
}

export class PostCountdown implements Action {
  readonly type = CreateCountdownActionTypes.PostCountdown;
  constructor(public countdown: Countdown) {}
}

export class PostCountdownSuccess implements Action {
  readonly type = CreateCountdownActionTypes.PostCountdownSuccess;
  constructor(public countdown: Countdown) {}
}

export class PostCountdownError implements Action {
  readonly type = CreateCountdownActionTypes.PostCountdownError;
  constructor(public error: any) {}
}

export type ActionTypes =
  PostCountdown
  | PostCountdownSuccess
  | PostCountdownError;
