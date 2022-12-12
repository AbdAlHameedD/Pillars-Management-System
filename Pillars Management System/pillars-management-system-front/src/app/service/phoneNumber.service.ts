import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomerAndPhoneNumbers } from '../data/customerAndPhoneNumbers';
import { Customer } from '../data/customer';
import { PhoneNumber } from '../data/phoneNumber';

@Injectable({
  providedIn: 'root',
})
export class PhoneNumberService {
  constructor(private http: HttpClient, private router: Router) {}

  public addPhoneNumber(phoneNumber: PhoneNumber) {
    return this.http
      .post('https://localhost:44356/api/phoneNumber', phoneNumber)
      .subscribe();
  }

  public updatePhoneNumber(phoneNumber: PhoneNumber) {
    return this.http
      .put('https://localhost:44356/api/phoneNumber', phoneNumber)
      .subscribe();
  }

  public deletePhoneNumber(phoneNumberId: number) {
    return this.http
      .delete(`https://localhost:44356/api/phoneNumber/${phoneNumberId}`)
      .subscribe();
  }
}
