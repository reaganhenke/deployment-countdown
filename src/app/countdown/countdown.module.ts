import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
// import { EffectsModule } from '@ngrx/effects';

// import { TodoComponent } from './components/todo/todo.component';
// import { TodosComponent } from './components/todos/todos.component';

// import { TodoEffects } from 'app/todo/effects/todos';
import * as reducers from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { CountdownEffects } from './effects/countdown.effects';

@NgModule({
  imports: [
    // CommonModule,
    StoreModule.forFeature('countdown', reducers.reducer),
    EffectsModule.forFeature([CountdownEffects])
  ],
  // declarations: [
  //   TodoComponent,
  //   TodosComponent
  // ],
  // exports: [
  //   TodoComponent,
  //   TodosComponent
  // ]
})
export class CountdownModule { }
