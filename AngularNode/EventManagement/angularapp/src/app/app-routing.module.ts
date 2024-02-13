import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { OrganiserDashboardComponent } from './components/organiser-dashboard/organiser-dashboard.component';
import { AddEventComponent } from './components/add-event/add-event.component';
import { EditEventComponent } from './components/edit-event/edit-event.component';
import { ErrorComponent } from './components/error/error.component';
import { ParticipantDashboardComponent } from './components/participant-dashboard/participant-dashboard.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'organiser-dashboard', component: OrganiserDashboardComponent},
  { path: 'participant-dashboard', component: ParticipantDashboardComponent},
  { path: 'add-event', component: AddEventComponent},
  { path: 'edit-event/:id', component: EditEventComponent},
  { path: 'error', component: ErrorComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/error' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
