import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { CountdownService } from 'src/app/services/countdown.service';
import { PostCountdownSuccess, PostCountdownError,
  PostCountdown, CreateCountdownActionTypes } from '../actions/create-countdown.actions';
import { Countdown } from 'src/app/shared/countdown.model';
import { Router } from '@angular/router';
import { LoadCountdownSuccess } from 'src/app/countdown/actions/countdown.actions';

@Injectable()
export class CountdownEffects {

  @Effect()
  postCountdown = this.actions$.pipe(
    ofType<PostCountdown>(CreateCountdownActionTypes.PostCountdown),
    switchMap(action => {
      return this.service.postCountdown(action.countdown).pipe(
        map((response: Countdown) =>
         new PostCountdownSuccess(response)
        ),
        catchError((error: any) => of(new PostCountdownError(error)))
      );
    })
  );

  @Effect()
  countdownSuccess = this.actions$.pipe(
    ofType<PostCountdownSuccess>(CreateCountdownActionTypes.PostCountdownSuccess),
    map(action => {
      this.router.navigate([action.countdown._id]);
      return new LoadCountdownSuccess(action.countdown);
    })
  );

  constructor(private actions$: Actions, private service: CountdownService, private router: Router) {}
}
