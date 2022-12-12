import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomerAndPhoneNumbers } from '../data/customerAndPhoneNumbers';
import { Customer } from '../data/customer';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  public customersAndPhoneNumbers: Map<number, CustomerAndPhoneNumbers> =
    new Map<number, CustomerAndPhoneNumbers>();

  constructor(private http: HttpClient, private router: Router) {}

  public getCustomersAndPhoneNumbers() {
    return this.http.get(
      'https://localhost:44356/api/customer/getCustomersAndPhoneNumbers'
    );
  }

  public getEmail(email: string) {
    let body = { email: email };

    return this.http.put('https://localhost:44356/api/customer/getEmail', body);
  }

  public addCustomer(newCustomer: Customer) {
    return this.http
      .post('https://localhost:44356/api/customer', newCustomer)
      .subscribe();
  }

  public removeCustomer(cusId: number) {
    return this.http
      .delete(`https://localhost:44356/api/customer/${cusId}`)
      .subscribe();
  }

  public updateCustomer(customer: Customer) {
    return this.http
      .put('https://localhost:44356/api/customer', customer)
      .subscribe();
  }
}
