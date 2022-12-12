import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './authentication/authentication.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthorizationGuardGuard } from './guard/authorization-guard.guard';

const routes: Routes = [
  {
    path: '',
    component: AuthenticationComponent,
  },

  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthorizationGuardGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
