import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css'],
})
export class AuthenticationComponent implements OnInit {
  loginFormGroup: FormGroup = new FormGroup({
    usernameFormControl: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),

    passwordFormControl: new FormControl('', [
      Validators.required,
      Validators.maxLength(20),
      Validators.minLength(10),
    ]),
  });

  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit(): void {}

  public login() {
    if (this.loginFormGroup.valid) {
      let username: string =
        this.loginFormGroup.controls['usernameFormControl'].value;
      let password: string =
        this.loginFormGroup.controls['passwordFormControl'].value;

      this.authenticationService.login(username, password);
    }
  }
}
