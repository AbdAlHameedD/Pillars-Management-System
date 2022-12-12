import { DeleteTelephoneComponent } from './delete-telephone/delete-telephone.component';
import { UpdateTelephoneDialogComponent } from './update-telephone-dialog/update-telephone-dialog.component';
import { UpdateCustomerDialogComponent } from './update-customer-dialog/update-customer-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { CreateCustomerDialogComponent } from './create-customer-dialog/create-customer-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CustomerAndPhoneNumbers } from './../data/customerAndPhoneNumbers';
import { CustomerService } from './../service/customer.service';
import { Component } from '@angular/core';
import { DeleteCustomerDialogComponent } from './delete-customer-dialog/delete-customer-dialog.component';
import { Customer } from '../data/customer';
import { AddTelephoneDialogComponent } from './add-telephone-dialog/add-telephone-dialog.component';
import { PhoneNumber } from '../data/phoneNumber';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  private rowExpandedStatus: Map<number, boolean> = new Map<number, boolean>();

  constructor(
    public customerService: CustomerService,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) {}

  async ngOnInit() {
    this.getCustomersAndPhoneNumbers();
  }

  public handleCustomerExpand(rowNumber: number): void {
    if (this.isRowExpanded(rowNumber)) {
      this.closeRow(rowNumber);
      this.setRowClosed(rowNumber);
    } else {
      this.expandRow(rowNumber);
      this.setRowExpanded(rowNumber);
    }
  }

  private expandRow(rowNumber: number): void {
    this.rotateRowExpandButtonContainer(rowNumber, 180);
    this.addBottomGrayBorder(rowNumber);
    this.takeDownExpandInformation(rowNumber);
  }

  private closeRow(rowNumber: number): void {
    this.rotateRowExpandButtonContainer(rowNumber, 0);
    this.removeBottomGrayBorder(rowNumber);
    this.liftExpandInformation(rowNumber);
  }

  private isRowExpanded(rowNumber: number): boolean {
    return this.rowExpandedStatus.get(rowNumber)!;
  }

  private setRowExpanded(rowNumber: number): void {
    this.rowExpandedStatus.set(rowNumber, true);
  }

  private setRowClosed(rowNumber: number): void {
    this.rowExpandedStatus.set(rowNumber, false);
  }

  private rotateRowExpandButtonContainer(
    rowNumber: number,
    rotateDegree: number
  ): void {
    document.getElementById(
      `expand-btn-${rowNumber}-container`
    )!.style.transform = `rotate(${rotateDegree}deg)`;
  }

  private removeBottomGrayBorder(rowNumber: number): void {
    document
      .getElementById(`expand-container-${rowNumber}`)!
      .classList.remove('bottom-gray-border');
  }

  private addBottomGrayBorder(rowNumber: number): void {
    document
      .getElementById(`expand-container-${rowNumber}`)!
      .classList.add('bottom-gray-border');
  }

  private async liftExpandInformation(rowNumber: number): Promise<void> {
    document.getElementById(`expand-information-${rowNumber}`)!.style.top =
      '-200px';

    //await delay(200);

    document.getElementById(`expand-container-${rowNumber}`)!.style.height =
      '0px';
  }

  private async takeDownExpandInformation(rowNumber: number): Promise<void> {
    document.getElementById(`expand-container-${rowNumber}`)!.style.height =
      'fit-content';

    //  await delay(200);

    document.getElementById(`expand-information-${rowNumber}`)!.style.top =
      '0px';
  }

  private getCustomersAndPhoneNumbers(): void {
    this.customerService.getCustomersAndPhoneNumbers().subscribe(
      (result: any) => {
        let temp: CustomerAndPhoneNumbers[] = result;

        for (let customerAndPhoneNumbers of temp) {
          this.customerService.customersAndPhoneNumbers.set(
            customerAndPhoneNumbers.customer.id!,
            customerAndPhoneNumbers
          );
        }

        this.fillRowExpandedStatus();
      },
      (error) => {
        console.log('Unable to connect the server.');
      }
    );
  }

  private fillRowExpandedStatus(): void {
    this.customerService.customersAndPhoneNumbers.forEach(
      (customerAndPhoneNumbers) => {
        this.rowExpandedStatus.set(customerAndPhoneNumbers.customer.id!, false);
      }
    );
  }

  public openCreateNewCustomerDialog(): void {
    this.dialog.open(CreateCustomerDialogComponent);
  }

  public openDeleteCustomerDialog(customer: Customer): void {
    this.dialog
      .open(DeleteCustomerDialogComponent, {
        data: { customer: customer },
      })
      .afterClosed()
      .subscribe((result) => {
        if (result === 'yes')
          this.toastr.success('Customer Deleted Successfully');
      });
  }

  public openUpdateCustomerDialog(customer: Customer): void {
    this.dialog.open(UpdateCustomerDialogComponent, {
      data: { customer: customer },
    });
  }

  public openAddTelephoneDialog(customerId: number): void {
    this.dialog.open(AddTelephoneDialogComponent, {
      data: { customerId: customerId },
    });
  }

  public openUpdateTelephoneDialog(phoneNumber: PhoneNumber): void {
    this.dialog.open(UpdateTelephoneDialogComponent, {
      data: { phoneNumber: phoneNumber },
    });
  }

  public openDeleteTelephoneDialog(phoneNumber: PhoneNumber): void {
    this.dialog.open(DeleteTelephoneComponent, {
      data: { phoneNumber: phoneNumber },
    });
  }
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
