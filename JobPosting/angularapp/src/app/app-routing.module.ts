import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent},
  { path: 'patient-dashboard', component: PatientDashboardComponent},
  { path: 'add-doctor', component: AddDoctorComponent},
  { path: 'edit-doctor/:id', component: EditDoctorComponent},
  { path: 'error', component: ErrorComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/error' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
