import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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

  constructor() {}

  ngOnInit(): void {}
}
