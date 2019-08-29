import { Component, OnInit, OnDestroy } from '@angular/core';
import { CountdownService } from '../../services/countdown.service';
import { Store, select } from '@ngrx/store';
import * as fromCountdown from '../reducers';
import { LoadCountdown } from '../actions/countdown.actions';
import { Observable, Subscription } from 'rxjs';
import { Countdown } from 'src/app/shared/countdown.model';
import { MatDialog } from '@angular/material/dialog';
import { ShareModalComponent } from 'src/app/share-modal/share-modal.component';
import { map } from 'rxjs/operators';
import { Location } from '@angular/common';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss'],
  providers: [CountdownService]
})

export class CountdownComponent implements OnInit, OnDestroy {

  countdown$: Observable<Countdown>;
  error$: Observable<any>;
  loading$: Observable<boolean>;
  countdownSubscription: Subscription;
  startDate: Date;
  endDate: Date;
  now = new Date();

  constructor(
    private store: Store<fromCountdown.State>,
    public dialog: MatDialog,
    private location: Location
  ) {
    setInterval(() => {
      this.now = new Date();
    }, 1000);
  }

  ngOnInit() {
    this.countdown$ = this.store.pipe(select(fromCountdown.getCountdown));
    this.error$ = this.store.pipe(select(fromCountdown.getError));
    this.loading$ = this.store.pipe(select(fromCountdown.getLoading));

    this.countdownSubscription = this.countdown$.pipe(
      map(countdown => {
        if (countdown) {
          const UTCstartDate = new Date(countdown.startDate);
          this.startDate = new Date(UTCstartDate.getUTCFullYear(),
          UTCstartDate.getUTCMonth(), UTCstartDate.getUTCDate());

          const UTCendDate = new Date(countdown.endDate);
          this.endDate = new Date(UTCendDate.getUTCFullYear(),
          UTCendDate.getUTCMonth(), UTCendDate.getUTCDate());

          this.paintPie(this.percent);
        } else {
          const id = this.location.path().substring(1);
          this.store.dispatch(new LoadCountdown(id));
        }
      })
    ).subscribe();
  }

  paintPie(percent?: number) {
    if (document.getElementById('pie')) {
      let radius = 50; // radius of the pie chart in pixels
      const coords = []; // holds Cartesian plane coords for svg path

      const angle = percent * 3.6; // 1% ~ 3.6deg
      radius = radius * 2;      // get diameter

      coords[0] = radius * Math.cos( Math.PI * angle / 180 );
      coords[1] = radius * Math.sin( Math.PI * angle / 180 );

      const path = 'M0,0 L' + radius + ',0 A' + radius + ',' + radius + ' 0 1,1 ' + coords[0] + ',' + coords[1] + ' Z';

      document.querySelectorAll( '.pie-chart svg path' )[0].setAttribute( 'd', path );
    } else {
      setTimeout(this.paintPie, 100, percent);
    }
  }

  get served() {
    return this.now.getTime() - this.startDate.getTime();
  }

  get remaining() {
    return this.endDate.getTime() - this.now.getTime();
  }

  get percent() {
    return (this.served / (this.endDate.getTime() - this.startDate.getTime())) * 100;
  }

  ngOnDestroy() {
    this.countdownSubscription.unsubscribe();
  }

  openModal() {
    this.dialog.open(ShareModalComponent);
  }
}
