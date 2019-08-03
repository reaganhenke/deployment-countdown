import { Component, OnInit } from '@angular/core';
import { Countdown } from '../countdown';
import { CountdownService } from '../../services/countdown.service';
import { Store, select } from '@ngrx/store';
// import { ContactDetailsComponent } from '../contact-details/contact-details.component';
import * as fromCountdown from '../reducers';
import { LoadCountdowns, PostCountdown } from '../actions/countdown.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss'],
  providers: [CountdownService]
})

export class CountdownComponent implements OnInit {

  countdowns$: Observable<Countdown[]>;
  // selectedContact: Countdown;

  constructor(private countdownService: CountdownService, private store: Store<fromCountdown.State>) { }

  ngOnInit() {
    this.store.dispatch(new LoadCountdowns());
    this.store.pipe(select(fromCountdown.getCountdowns));
  }

  createNewContact() {
    const contact = {
      name: '',
      email: '',
      phone: {
        work: '',
        mobile: ''
      }
    };
  }

  addCountdown() {
    const mockCountdown = {
      name: 'Mack Daddy',
      namePath: 'mack-daddy',
      arriveDate: '123',
      leaveDate: '123'
    };
    this.store.dispatch(new PostCountdown(mockCountdown));
  }

}
