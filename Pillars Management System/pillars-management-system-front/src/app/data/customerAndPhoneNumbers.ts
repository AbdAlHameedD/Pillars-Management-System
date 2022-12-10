import { PhoneNumber } from './phoneNumber';
import { Customer } from './customer';

export class CustomerAndPhoneNumbers {
  constructor(public customer: Customer, public phoneNumbers: PhoneNumber[]) {}
}
