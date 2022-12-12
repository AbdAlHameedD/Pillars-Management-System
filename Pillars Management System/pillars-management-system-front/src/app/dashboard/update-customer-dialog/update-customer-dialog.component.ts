import { Customer } from './../../data/customer';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from 'src/app/service/customer.service';

@Component({
  selector: 'app-update-customer-dialog',
  templateUrl: './update-customer-dialog.component.html',
  styleUrls: ['./update-customer-dialog.component.css'],
})
export class UpdateCustomerDialogComponent {
  private status: boolean | undefined;
  public updateCustomerFormGroup = new FormGroup({
    fullNameFormControl: new FormControl('', [
      Validators.required,
      Validators.maxLength(60),
    ]),

    emailFormControl: new FormControl('', [
      Validators.required,
      Validators.maxLength(320),
    ]),

    genderFormControl: new FormControl('male', Validators.required),

    birthDateFormControl: new FormControl(''),
  });

  constructor(
    private dialog: MatDialog,
    private toastr: ToastrService,
    private customerService: CustomerService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.setInitialValuesToGroupForm();
  }

  public async updateCustomer() {
    await this.emailIsValid();
    if (!this.status && !this.emailHasNotChanged()) {
      this.toastr.error('Email already exists');
      return;
    }

    this.data.customer.full_Name = this.getFullNameFromFormGroup();
    this.data.customer.email = this.getEmailFromFormGroup();
    this.data.customer.bod = this.getBirthOfDateFromFormGroup();
    this.data.customer.gender = this.getGenderFromFormGroup();
    this.customerService.customersAndPhoneNumbers.get(
      this.data.customer.id!
    )!.customer = <Customer>this.data.customer;
    this.customerService.updateCustomer(this.data.customer);
    this.toastr.success('Updated Customer Successfully');
  }

  private getFullNameFromFormGroup(): string {
    return this.updateCustomerFormGroup.controls['fullNameFormControl'].value!;
  }

  private getEmailFromFormGroup(): string {
    return this.updateCustomerFormGroup.controls['emailFormControl'].value!;
  }

  private getGenderFromFormGroup(): string {
    return this.updateCustomerFormGroup.controls['genderFormControl'].value!;
  }

  private getBirthOfDateFromFormGroup(): Date {
    return new Date(
      this.updateCustomerFormGroup.controls['birthDateFormControl'].value!
    );
  }
  private async emailIsValid(): Promise<void> {
    this.customerService
      .getEmail(
        this.updateCustomerFormGroup.controls['emailFormControl'].value!
      )
      .subscribe((result: any) => {
        if (result.email !== null) this.status = false;
        else this.status = true;
      });
    await delay(1500);
  }

  private emailHasNotChanged(): boolean {
    return this.getEmailFromFormGroup() == this.data.customer.email!;
  }

  private setInitialValuesToGroupForm(): void {
    this.updateCustomerFormGroup.controls['birthDateFormControl'].setValue(
      this.data.customer.bod!.toString()
    );
    this.updateCustomerFormGroup.controls['emailFormControl'].setValue(
      this.data.customer.email!.toString()
    );
    this.updateCustomerFormGroup.controls['fullNameFormControl'].setValue(
      this.data.customer.full_Name!
    );
    this.updateCustomerFormGroup.controls['genderFormControl'].setValue(
      this.data.customer.gender!
    );
  }
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
