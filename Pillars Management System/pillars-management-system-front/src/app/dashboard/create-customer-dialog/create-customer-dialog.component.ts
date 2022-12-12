import { ToastrModule, ToastrService } from 'ngx-toastr';
import { CustomerAndPhoneNumbers } from './../../data/customerAndPhoneNumbers';
import { Customer } from './../../data/customer';
import { MatDialog } from '@angular/material/dialog';
import {
  FormGroup,
  FormControl,
  Validators,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';
import { PhoneNumber } from './../../data/phoneNumber';
import { Component } from '@angular/core';
import { CustomerService } from 'src/app/service/customer.service';

@Component({
  selector: 'app-create-customer-dialog',
  templateUrl: './create-customer-dialog.component.html',
  styleUrls: ['./create-customer-dialog.component.css'],
})
export class CreateCustomerDialogComponent {
  private status: boolean | undefined;
  public addNewCustomerFormGroup = new FormGroup({
    fullNameFormControl: new FormControl('', [
      Validators.required,
      Validators.maxLength(60),
    ]),

    emailFormControl: new FormControl('', [
      Validators.required,
      Validators.maxLength(320),
    ]),

    genderFormControl: new FormControl('male', Validators.required),
    phoneNumberFormControl: new FormControl('', [
      Validators.minLength(9),
      Validators.maxLength(9),
    ]),

    birthDateFormControl: new FormControl(''),
  });

  constructor(
    private dialog: MatDialog,
    private toastr: ToastrService,
    private customerService: CustomerService
  ) {}

  public async addNewCustomer(): Promise<void> {
    await this.emailIsValid();
    if (!this.status) {
      this.toastr.error('Email already exists');
      return;
    }

    let newCustomer = new Customer();
    newCustomer.full_Name =
      this.addNewCustomerFormGroup.controls['fullNameFormControl'].value!;
    newCustomer.email =
      this.addNewCustomerFormGroup.controls['emailFormControl'].value!;
    newCustomer.gender =
      this.addNewCustomerFormGroup.controls['genderFormControl'].value!;
    newCustomer.bod = new Date(
      this.addNewCustomerFormGroup.controls['birthDateFormControl'].value!
    );
    newCustomer.creation_Date = new Date();

    let phoneNumbers: PhoneNumber[] = [];
    let customerAndPhoneNumber: CustomerAndPhoneNumbers =
      new CustomerAndPhoneNumbers(newCustomer, phoneNumbers);
    this.customerService.addCustomer(newCustomer);
    window.location.reload();
  }

  private async emailIsValid(): Promise<void> {
    this.customerService
      .getEmail(
        this.addNewCustomerFormGroup.controls['emailFormControl'].value!
      )
      .subscribe((result: any) => {
        if (result.email !== null) this.status = false;
        else this.status = true;
      });
    await delay(1500);
  }

  public closeDialog(): void {
    this.dialog.closeAll();
  }
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
