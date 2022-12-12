import { ToastrService } from 'ngx-toastr';
import { PhoneNumber } from './../../data/phoneNumber';
import { PhoneNumberService } from 'src/app/service/phoneNumber.service';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomerService } from 'src/app/service/customer.service';
import { CustomerAndPhoneNumbers } from 'src/app/data/customerAndPhoneNumbers';

@Component({
  selector: 'app-delete-telephone',
  templateUrl: './delete-telephone.component.html',
  styleUrls: ['./delete-telephone.component.css'],
})
export class DeleteTelephoneComponent {
  constructor(
    private customerService: CustomerService,
    private phoneNumberService: PhoneNumberService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  public deleteTelephone(): void {
    this.customerService.customersAndPhoneNumbers.forEach(
      (customerAndPhoneNumbers: CustomerAndPhoneNumbers) => {
        if (
          customerAndPhoneNumbers.customer.id ===
          this.data.phoneNumber.customer_ID
        ) {
          customerAndPhoneNumbers.phoneNumbers.forEach((phoneNumber, index) => {
            if (phoneNumber.id === this.data.phoneNumber.id!)
              customerAndPhoneNumbers.phoneNumbers.splice(index, 1);
          });
        }
      }
    );
    this.phoneNumberService.deletePhoneNumber(this.data.phoneNumber.id!);
    this.toastr.success('Telephone deleted successfully');
  }
}
