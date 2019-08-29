import { Component, Input } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ShareModalComponent } from '../share-modal/share-modal.component';
import { Countdown } from '../shared/countdown.model';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  @Input() countdown: Countdown;

  constructor(
    private dialog: MatDialog
  ) { }

  openShare() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      countdown: this.countdown
    };
    this.dialog.open(ShareModalComponent, dialogConfig);
  }
}
