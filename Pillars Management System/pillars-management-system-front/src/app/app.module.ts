import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderLogoComponent } from './header-logo/header-logo.component';
import { FirstAndLastName } from './pipe/firstAndLastName';
import { MatDialogModule } from '@angular/material/dialog';
import { CreateCustomerDialogComponent } from './dashboard/create-customer-dialog/create-customer-dialog.component';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ToastrModule } from 'ngx-toastr';
import { DeleteCustomerDialogComponent } from './dashboard/delete-customer-dialog/delete-customer-dialog.component';
import { UpdateCustomerDialogComponent } from './dashboard/update-customer-dialog/update-customer-dialog.component';
import { AddTelephoneDialogComponent } from './dashboard/add-telephone-dialog/add-telephone-dialog.component';
import { UpdateTelephoneDialogComponent } from './dashboard/update-telephone-dialog/update-telephone-dialog.component';
import { DeleteTelephoneComponent } from './dashboard/delete-telephone/delete-telephone.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    DashboardComponent,
    HeaderLogoComponent,
    FirstAndLastName,
    CreateCustomerDialogComponent,
    DeleteCustomerDialogComponent,
    UpdateCustomerDialogComponent,
    AddTelephoneDialogComponent,
    UpdateTelephoneDialogComponent,
    DeleteTelephoneComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      timeOut: 1500,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
