import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

import { CountdownService } from 'src/app/services/countdown.service';
import { PostCountdownSuccess, PostCountdownError,
  PostCountdown, CreateCountdownActionTypes } from '../actions/create-countdown.actions';
import { Countdown } from 'src/app/shared/countdown.model';

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

  constructor(private actions$: Actions, private service: CountdownService) {}
}
