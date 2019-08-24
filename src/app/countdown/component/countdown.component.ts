import { Component, OnInit } from '@angular/core';
import { CountdownService } from '../../services/countdown.service';
import { Store, select } from '@ngrx/store';
// import { ContactDetailsComponent } from '../contact-details/contact-details.component';
import * as fromCountdown from '../reducers';
import { LoadCountdown } from '../actions/countdown.actions';
import { Observable, of } from 'rxjs';
import { Countdown } from 'src/app/shared/countdown.model';
import { MatDialog } from '@angular/material/dialog';
import { ShareModalComponent } from 'src/app/share-modal/share-modal.component';
import { take, filter, tap } from 'rxjs/operators';
import { Location } from '@angular/common';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss'],
  providers: [CountdownService]
})

export class CountdownComponent implements OnInit {

  countdown$: Observable<Countdown>;
  error$: Observable<any>;
  loading$: Observable<boolean>;

  constructor(
    private countdownService: CountdownService,
    private store: Store<fromCountdown.State>,
    public dialog: MatDialog,
    private location: Location
    ) { }

  ngOnInit() {
    this.countdown$ = this.store.pipe(select(fromCountdown.getCountdown));
    this.error$ = this.store.pipe(select(fromCountdown.getError));
    this.loading$ = this.store.pipe(select(fromCountdown.getLoading));

    this.countdown$.pipe(
      take(1),
      filter(countdown => !countdown),
      tap(() => {
        const id = this.location.path().substring(1);
        this.store.dispatch(new LoadCountdown(id));
      })
    ).subscribe();
  }

  openModal() {
    this.dialog.open(ShareModalComponent);
  }
}
