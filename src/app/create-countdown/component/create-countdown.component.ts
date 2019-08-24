import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, ValidationErrors } from '@angular/forms';
import { PostCountdown, Retry } from '../actions/create-countdown.actions';
import * as fromCountdown from '../reducers';
import { Store, select } from '@ngrx/store';
import { of } from 'rxjs';

@Component({
  selector: 'app-create-countdown',
  templateUrl: './create-countdown.component.html',
  styleUrls: ['./create-countdown.component.scss']
})
export class CreateCountdownComponent implements OnInit {

  countdownForm: FormGroup;
  showErrors = false;
  posting$;
  error$;

  constructor(private fb: FormBuilder, private store: Store<fromCountdown.State>) { }

  ngOnInit() {
    this.posting$ = this.store.pipe(select(fromCountdown.getPosting));
    this.error$ = this.store.pipe(select(fromCountdown.getError));

    // this.error$.subscribe(error => {
    //   console.log('ERROR: ', error);
    // });

    this.countdownForm = this.fb.group({
      name: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', [Validators.required, this.notInPast]]
    }, {validator: this.laterThanStart});
  }

  showError(controlName: string) {
    const control = this.countdownForm.get(controlName);
    return  !control.valid && (this.showErrors || control.touched);
  }

  submit(e: Event) {
    e.preventDefault();
    if (this.countdownForm.valid) {
      this.showErrors = false;
      console.log('posting: ', this.countdownForm.getRawValue());
      this.store.dispatch(new PostCountdown(this.countdownForm.getRawValue()));
    } else {
      this.showErrors = true;
    }
    console.log('submitting');
    console.log(this.countdownForm);
  }

  focusInput() {
    this.showErrors = false;
    const input = document.getElementById('inner') as HTMLInputElement;
    input.focus();
    const control = this.countdownForm.get('name');
    if (control.pristine) {
      // clear if first time
      control.setValue('');
    }
  }

  laterThanStart(c: FormControl): ValidationErrors {
    if (!c.get('startDate').value || !c.get('endDate').value) {
      return null;
    } else {
      const startDate = Date.parse(c.get('startDate').value);
      const endDate = Date.parse(c.get('endDate').value);

      if (endDate <= startDate) {
        return {later: true};
      } else {
        return null;
      }
    }
  }

  notInPast(c: FormControl): ValidationErrors {
    const now = Date.now();
    const endDate = Date.parse(c.value);

    if (endDate <= now) {
      return {past: true};
    } else {
      return null;
    }
  }

  retry() {
    this.store.dispatch(new Retry());
  }
}
