import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import {
  LOAD_COUNTDOWNS,
  LoadCountdowns,
  LoadCountdownsSuccess,
  LoadCountdownsError,
  POST_COUNTDOWN,
  PostCountdown
} from '../actions/countdown.actions';
import { CountdownService } from 'src/app/services/countdown.service';
import { Countdown } from '../countdown';

@Injectable()
export class CountdownEffects {

  @Effect()
  loadCountdowns = this.actions$.pipe(
    ofType<LoadCountdowns>(LOAD_COUNTDOWNS),
    switchMap(action => {
      return this.service.getCountdowns().pipe(
        map((response: Countdown[]) =>
          new LoadCountdownsSuccess(response)
        ),
        catchError(error => of(new LoadCountdownsError(error)))
      );
    })
  );

  @Effect({dispatch: false})
  postCountdown = this.actions$.pipe(
    ofType<PostCountdown>(POST_COUNTDOWN),
    tap(action => {
      console.log('TAPPING', action);
      this.service.postCountdown(action.countdown);
    })
  );

  constructor(private actions$: Actions, private service: CountdownService) {}
}
