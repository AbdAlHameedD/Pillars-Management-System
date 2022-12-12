import { PhoneNumber } from './../../data/phoneNumber';
import { PhoneNumberService } from './../../service/phoneNumber.service';
import { CustomerService } from 'src/app/service/customer.service';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-telephone-dialog',
  templateUrl: './add-telephone-dialog.component.html',
  styleUrls: ['./add-telephone-dialog.component.css'],
})
export class AddTelephoneDialogComponent {
  public addNewTelephoneFormGroup = new FormGroup({
    telephoneFormControl: new FormControl('', [
      Validators.required,
      Validators.maxLength(9),
      Validators.minLength(9),
    ]),
  });

  constructor(
    private customerService: CustomerService,
    private phoneNumberService: PhoneNumberService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  public addNewTelephone(): void {
    if (this.addNewTelephoneFormGroup.valid) {
      let phoneNumber: PhoneNumber = new PhoneNumber();
      phoneNumber.tel = `+962${this.addNewTelephoneFormGroup.controls[
        'telephoneFormControl'
      ].value!}`;
      phoneNumber.customer_id = this.data.customerId;

      this.phoneNumberService.addPhoneNumber(phoneNumber);
      window.location.reload();
    }
  }
}
