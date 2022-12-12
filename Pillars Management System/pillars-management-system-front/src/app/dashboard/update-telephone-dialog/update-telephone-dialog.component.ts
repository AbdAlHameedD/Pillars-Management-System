import { ToastrService } from 'ngx-toastr';
import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { CustomerService } from 'src/app/service/customer.service';
import { PhoneNumberService } from 'src/app/service/phoneNumber.service';
import { DialogModule } from '@angular/cdk/dialog';

@Component({
  selector: 'app-update-telephone-dialog',
  templateUrl: './update-telephone-dialog.component.html',
  styleUrls: ['./update-telephone-dialog.component.css'],
})
export class UpdateTelephoneDialogComponent {
  public updateTelephoneFormGroup = new FormGroup({
    telephoneFormControl: new FormControl('', [
      Validators.required,
      Validators.maxLength(9),
      Validators.minLength(9),
    ]),
  });

  constructor(
    private customerService: CustomerService,
    private phoneNumberService: PhoneNumberService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {}

  public updateTelephone(): void {
    if (this.updateTelephoneFormGroup.valid) {
      this.dialog.closeAll();
      this.data.phoneNumber.tel = `+962${this.updateTelephoneFormGroup.controls[
        'telephoneFormControl'
      ].value!}`;

      console.log(this.data);

      this.customerService.customersAndPhoneNumbers
        .get(this.data.phoneNumber.customer_ID)!
        .phoneNumbers.find((phoneNumber) => {
          if (phoneNumber.id == this.data.phoneNumber.id!) {
            phoneNumber.tel = this.data.phoneNumber.tel;
          }
        });

      console.log(this.data.phoneNumber);

      this.phoneNumberService.updatePhoneNumber(this.data.phoneNumber);
      this.toastr.success('Telephoe updated successfully');
    }
  }
}
