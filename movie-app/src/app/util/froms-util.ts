import {UntypedFormControl, UntypedFormGroup} from '@angular/forms';

export class FormsUtil {
  static validateAllFormFields(formGroup: UntypedFormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof UntypedFormControl) {
        control.markAsTouched({onlySelf: true});
        control.markAsDirty({onlySelf: true});
      } else if (control instanceof UntypedFormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  static controlIsInvalid(formGroup: UntypedFormGroup, controlName: string) {
    return (
      formGroup.controls[controlName]?.invalid &&
      formGroup.controls[controlName]?.dirty
    );
  }
}
