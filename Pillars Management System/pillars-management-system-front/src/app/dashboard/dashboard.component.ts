import { CustomerAndPhoneNumbers } from './../data/customerAndPhoneNumbers';
import { CustomerService } from './../service/customer.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  private rowExpandedStatus: Map<number, boolean> = new Map<number, boolean>();
  public customersAndPhoneNumbers: CustomerAndPhoneNumbers[] = [];

  constructor(private customerService: CustomerService) {}

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

    console.log(rowNumber);
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
        this.customersAndPhoneNumbers = result;
        this.fillRowExpandedStatus();
      },
      (error) => {
        console.log('Unable to connect the server.');
      }
    );
  }

  private fillRowExpandedStatus(): void {
    this.customersAndPhoneNumbers.forEach((customerAndPhoneNumbers) => {
      this.rowExpandedStatus.set(customerAndPhoneNumbers.customer.id!, false);
    });
  }
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
