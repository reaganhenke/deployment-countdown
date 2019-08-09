import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
      name: ['', Validators.required],
      startDate: ['', Validators.required],
      end: ['', Validators.required]
    });
  }

  submit(e: Event) {
    e.preventDefault();
    console.log('submitting');
  }

}
