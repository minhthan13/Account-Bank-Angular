import { Directive, Input } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
  ValidatorFn,
} from '@angular/forms';

/** Validator function to match confirm password with password */
export function MatchPasswordValidator(password: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const confirmPassword = control.value;
    const passwordControl = control.root.get(password);
    if (passwordControl && confirmPassword !== passwordControl.value) {
      return { MatchPassword: true };
    }

    return null;
  };
}
@Directive({
  selector: '[MatchPassword]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: MatchPasswordDirective,
      multi: true,
    },
  ],
})
export class MatchPasswordDirective implements Validator {
  @Input('MatchPassword') password: string;

  validate(control: AbstractControl): ValidationErrors | null {
    return MatchPasswordValidator(this.password)(control);
  }
}
