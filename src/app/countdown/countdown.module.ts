import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import * as reducers from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { CountdownEffects } from './effects/countdown.effects';
import { DaysComponent } from './component/days/days.component';
import { DecimalPipe } from '@angular/common';

@NgModule({
  imports: [
    StoreModule.forFeature('countdown', reducers.reducer),
    EffectsModule.forFeature([CountdownEffects])
  ],
  // declarations: [DaysComponent],
  // providers: [DecimalPipe]
})
export class CountdownModule { }
