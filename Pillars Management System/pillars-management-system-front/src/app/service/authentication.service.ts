import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient, private router: Router) {}

  public login(username: string, password: string) {
    const body = {
      username: username,
      password: password,
    };

    const headerDict = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    this.http
      .post('https://localhost:44356/api/account/login', body, requestOptions)
      .subscribe(
        (result: string | object) => {
          this.showLoginSucessfulMessage();

          const response = {
            token: result.toString(),
          };

          localStorage.setItem('token', response.token);
          let data: any = jwtDecode(response.token);
          localStorage.setItem('user', JSON.stringify({ ...data }));

          this.router.navigate(['/dashboard']);
        },
        (error: HttpErrorResponse) => {
          if (error.status == 401) {
            this.showLoginInvalidMessage();
          } else {
            this.showUnableToConnectTheServerMessage();
          }
        }
      );
  }

  private async showLoginInvalidMessage(): Promise<void> {
    let loginMessageStatus: HTMLElement = <HTMLElement>(
      document.querySelector('#loginStatusMessage')
    );

    loginMessageStatus.classList.remove('d-none');
    loginMessageStatus.innerText = 'The username or password is incorrect';
    loginMessageStatus.style.color = 'red';
    await delay(2000);
    loginMessageStatus.classList.add('d-none');
  }

  private async showLoginSucessfulMessage(): Promise<void> {
    let loginMessageStatus: HTMLElement = <HTMLElement>(
      document.querySelector('#loginStatusMessage')
    );

    loginMessageStatus.classList.remove('d-none');
    loginMessageStatus.innerText = 'Logged in successfully';
    loginMessageStatus.style.color = 'green';
    await delay(2000);
    loginMessageStatus.classList.add('d-none');
  }

  private async showUnableToConnectTheServerMessage(): Promise<void> {
    let loginMessageStatus: HTMLElement = <HTMLElement>(
      document.querySelector('#loginStatusMessage')
    );

    loginMessageStatus.classList.remove('d-none');
    loginMessageStatus.innerText = 'Unable to connect the server, try later';
    loginMessageStatus.style.color = 'yellow';
    await delay(2000);
    loginMessageStatus.classList.add('d-none');
  }
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
