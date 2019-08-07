import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CountdownComponent } from './countdown/component/countdown.component';
import { CountdownService } from './services/countdown.service';
import { HttpClientModule } from '@angular/common/http';
import * as countdownReducers from './countdown/reducers';
import { CountdownModule } from './countdown/countdown.module';
import { EffectsModule } from '@ngrx/effects';
import { CreateCountdownComponent } from './create-countdown/component/create-countdown.component';
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    CountdownComponent,
    CreateCountdownComponent,
    AboutComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot([]),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({}),
    CountdownModule
  ],
  providers: [ CountdownService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
