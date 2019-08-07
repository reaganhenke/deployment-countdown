import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateCountdownComponent } from './create-countdown/component/create-countdown.component';
import { AboutComponent } from './about/about.component';
import { CountdownComponent } from './countdown/component/countdown.component';

const routes: Routes = [
  { path: 'create',
    component: CreateCountdownComponent
  },
  { path: 'about',
    component: AboutComponent
  },
  { path: ':id',
    component: CountdownComponent
  },
  { path: '',
    pathMatch: 'full',
    redirectTo: 'create'
  // component: CountdownComponent
  }
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
