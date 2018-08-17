import { Component, EventEmitter, HostBinding } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorMatcher } from '../error-matcher';
import { FormField } from '../form-field';
import { ResourceApiService } from '../shared/resource-api/resource-api.service';
import { fadeTransition } from '../shared/animations';
import { IThrivForm } from '../shared/IThrivForm';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  animations: [fadeTransition()]
})
export class LoginFormComponent {
  @HostBinding('@fadeTransition')
  title: string;
  emailToken: string;
  errorEmitter = new EventEmitter<string>();
  errorMatcher = new ErrorMatcher();
  linkFromConfirmEmail = false;
  loginForm: FormGroup = new FormGroup({});
  fields = {
    email: new FormField({
      formControl: new FormControl(),
      required: true,
      placeholder: 'Email',
      type: 'text',
    }),
    password: new FormField({
      formControl: new FormControl(),
      required: true,
      placeholder: 'Password',
      type: 'password',
    }),
  };
  iThrivForm = new IThrivForm(this.fields, this.loginForm);

  constructor(
    private route: ActivatedRoute,
    private api: ResourceApiService,
    private router: Router
  ) {
    this.route.params.subscribe(params => {
      if ('email_token' in params) {
        this.emailToken = params['email_token'];
        this.linkFromConfirmEmail = true;
      }
    });
    this.iThrivForm.loadForm();
  }

  getFields() {
    return this.iThrivForm.getFields();
  }

  goForgotPassword() {
    this.router.navigate(['forgot_password']);
  }

  onSubmit() {
    this.iThrivForm.validate();
    if (!this.loginForm.valid) { return; }

    this.api.login(this.fields['email'].formControl.value,
      this.fields['password'].formControl.value,
      this.emailToken).subscribe(token => {
        this.api.openSession(token['token']).subscribe(user => {
          this.router.navigate(['']);
        });
      }, error1 => {
        if (error1) {
          this.errorEmitter.emit(error1);
        } else {
          this.errorEmitter.emit('An unexpected error occured.  Please contact support.');
        }
      });
  }

  onCancel() {
    this.router.navigate(['']);
  }
}
