import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { ErrorComponent } from './components/error/error.component';
import { OrganiserDashboardComponent } from './components/organiser-dashboard/organiser-dashboard.component';
import { ParticipantDashboardComponent } from './components/participant-dashboard/participant-dashboard.component';
import { AddTournamentComponent } from './components/add-tournament/add-tournament.component';
import { EditTournamentComponent } from './components/edit-tournament/edit-tournament.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    ErrorComponent,
    OrganiserDashboardComponent,
    ParticipantDashboardComponent,
    AddTournamentComponent,
    EditTournamentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
