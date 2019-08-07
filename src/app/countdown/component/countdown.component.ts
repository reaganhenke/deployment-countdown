import { Component, OnInit } from '@angular/core';
import { CountdownService } from '../../services/countdown.service';
import { Store, select } from '@ngrx/store';
// import { ContactDetailsComponent } from '../contact-details/contact-details.component';
import * as fromCountdown from '../reducers';
import { LoadCountdown } from '../actions/countdown.actions';
import { Observable, of } from 'rxjs';
import { Countdown } from 'src/app/shared/countdown.model';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss'],
  providers: [CountdownService]
})

export class CountdownComponent implements OnInit {

  countdown$: Observable<Countdown>;

  constructor(private countdownService: CountdownService, private store: Store<fromCountdown.State>) { }

  ngOnInit() {
    this.store.dispatch(new LoadCountdown('5d47463a830dda001704d436'));
    this.countdown$ = this.store.pipe(select(fromCountdown.getCountdown));
  }

}
