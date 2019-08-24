import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import * as reducers from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { CountdownEffects } from './effects/create-countdown.effects';

@NgModule({
  imports: [
    StoreModule.forFeature('create-countdown', reducers.reducer),
    EffectsModule.forFeature([CountdownEffects])
  ]
})
export class CreateCountdownModule { }
