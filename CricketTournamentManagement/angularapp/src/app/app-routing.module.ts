import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ErrorComponent } from './components/error/error.component';
import { OrganiserDashboardComponent } from './components/organiser-dashboard/organiser-dashboard.component';
import { ParticipantDashboardComponent } from './components/participant-dashboard/participant-dashboard.component';
import { AddTournamentComponent } from './components/add-tournament/add-tournament.component';
import { EditTournamentComponent } from './components/edit-tournament/edit-tournament.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'organiser-dashboard', component: OrganiserDashboardComponent},
  { path: 'participant-dashboard', component: ParticipantDashboardComponent},
  { path: 'add-tournament', component: AddTournamentComponent},
  { path: 'edit-tournament/:id', component: EditTournamentComponent},
  { path: 'error', component: ErrorComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/error' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
