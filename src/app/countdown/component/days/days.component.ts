import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-days',
  templateUrl: './days.component.html',
  styleUrls: ['./days.component.scss']
})
export class DaysComponent {
  @Input() title: string;
  @Input() time: number;

  constructor() { }

  get weeks() {
    return (((this.time / 1000) / 3600) / 24) / 7;
  }

  get days() {
    return ((this.time / 1000) / 3600) / 24;
  }

  get hours() {
    return (this.time / 1000) / 3600;
  }

  get minutes() {
    return (this.time / 1000) / 60;
  }

  get seconds() {
    return this.time / 1000;
  }
}
