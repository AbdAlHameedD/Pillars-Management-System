import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomerAndPhoneNumbers } from '../data/customerAndPhoneNumbers';
import { Customer } from '../data/customer';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private http: HttpClient, private router: Router) {}

  public getCustomersAndPhoneNumbers() {
    return this.http.get(
      'https://localhost:44356/api/customer/getCustomersAndPhoneNumbers'
    );
  }
}
