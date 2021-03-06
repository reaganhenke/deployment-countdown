import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import {
  LoadCountdown,
  CountdownActionTypes,
  LoadCountdownSuccess,
  LoadCountdownError
} from '../actions/countdown.actions';
import { CountdownService } from 'src/app/services/countdown.service';
import { Countdown } from 'src/app/shared/countdown.model';

@Injectable()
export class CountdownEffects {

  @Effect()
  loadCountdown = this.actions$.pipe(
    ofType<LoadCountdown>(CountdownActionTypes.LoadCountdown),
    switchMap(action => {
      return this.service.getCountdown(action.id).pipe(
        map((response: Countdown) =>
          new LoadCountdownSuccess(response)
        ),
        catchError(error => of(new LoadCountdownError(error)))
      );
    })
  );

  constructor(private actions$: Actions, private service: CountdownService) {}
}
