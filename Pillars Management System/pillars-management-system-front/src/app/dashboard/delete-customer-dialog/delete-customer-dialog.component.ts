import { CustomerService } from 'src/app/service/customer.service';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-customer-dialog',
  templateUrl: './delete-customer-dialog.component.html',
  styleUrls: ['./delete-customer-dialog.component.css'],
})
export class DeleteCustomerDialogComponent {
  constructor(
    private customerService: CustomerService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  public deleteCustomer(): void {
    this.customerService.removeCustomer(this.data.customer.id);
    this.customerService.customersAndPhoneNumbers.delete(
      this.data.customer.id!
    );
  }
}
