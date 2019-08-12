import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-inline-input',
  template: `
    <span contenteditable="true" id="inner"
      (input)="change($event)" (blur)="touch($event)"></span>
  `,
  styleUrls: ['../component/create-countdown.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InlineInputComponent),
      multi: true
    }
  ]
})
export class InlineInputComponent implements ControlValueAccessor {
  onChange;
  onTouched;

  writeValue(obj: any): void {
    document.getElementById('inner').innerHTML = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  change($event) {
    this.onChange($event.target.textContent);
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  touch($event) {
    this.onTouched($event.target.textContent);
  }

  // https://netbasal.com/angular-custom-form-controls-made-easy-4f963341c8e2
}
