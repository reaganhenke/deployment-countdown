import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Countdown } from '../shared/countdown.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-share-modal',
  templateUrl: './share-modal.component.html',
  styleUrls: ['./share-modal.component.scss']
})
export class ShareModalComponent {
  countdown: Countdown;
  copied: boolean;

  constructor(
    public dialogRef: MatDialogRef<ShareModalComponent>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.countdown = data.countdown;
  }

  preventFocus() {
    document.getElementById('focus-holder').setAttribute('tabindex', '-1');
  }

  get url() {
    return 'REPLACEME.COm' + this.router.url;
  }

  copySuccess() {
    this.copied = true;
    setTimeout(() => this.copied = false, 1000);
  }

  close() {
    this.dialogRef.close();
  }
}
