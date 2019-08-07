import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import * as reducers from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { CountdownEffects } from './effects/countdown.effects';

@NgModule({
  imports: [
    StoreModule.forFeature('countdown', reducers.reducer),
    EffectsModule.forFeature([CountdownEffects])
  ]
})
export class CountdownModule { }
