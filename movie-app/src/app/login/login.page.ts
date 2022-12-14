import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {UserService} from "../service/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormsUtil} from "../util/froms-util";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  form: UntypedFormGroup;

  constructor(
    private _userService: UserService,
    private _router: Router
  ) {
    this.form = new UntypedFormGroup({
      email: new UntypedFormControl('', [Validators.required, Validators.email]),
      password: new UntypedFormControl('', [Validators.required])
    });
  }

  login() {
    FormsUtil.validateAllFormFields(this.form);
    if (this.form.valid) {
      this._userService
        .authenticate(
          this.form.value.email,
          this.form.value.password
        )
        .subscribe((_: any) => {
          this._router.navigateByUrl('/movies').then();
        });
    }
  }
}
