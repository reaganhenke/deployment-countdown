import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-create-countdown',
  templateUrl: './create-countdown.component.html',
  styleUrls: ['./create-countdown.component.scss']
})
export class CreateCountdownComponent implements OnInit {

  countdownForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.countdownForm = this.fb.group({
      name: ['mack daddy', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    }, {validator: this.laterThanStart});
  }

  showError(controlName: string) {
    const control = this.countdownForm.get(controlName);
    return !control.valid && control.touched;
  }

  submit(e: Event) {
    e.preventDefault();
    console.log('submitting');
    console.log(this.countdownForm);
  }

  focusInput() {
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
}
