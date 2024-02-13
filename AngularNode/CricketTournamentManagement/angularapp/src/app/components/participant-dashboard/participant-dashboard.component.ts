import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CricketTournament } from 'src/app/models/crickettournament.model';
import { CrickettournamentService } from 'src/app/services/crickettournament.service';

@Component({
  selector: 'app-participant-dashboard',
  templateUrl: './participant-dashboard.component.html',
  styleUrls: ['./participant-dashboard.component.css']
})
export class ParticipantDashboardComponent implements OnInit {

  
  showDeletePopup = false;
  selectedCricketTournament: CricketTournament; 
  showLogoutPopup = false;
  selectedItem: any = {};
  showModal: boolean = false;
  
  constructor(private router: Router,private cricketTournamentService: CrickettournamentService ) { }

  navigateToAddRental() {
    this.router.navigate(['/add-tournament']);
  }
  logout() {
    // Perform logout logic here
    // For example, clear user authentication, navigate to the login page, etc.
    console.log('Logout clicked');
    // For demonstration purposes, let's navigate to the login page
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    window.location.href = '/login';
  }

  cricketTournaments: any[] = []; // Declare the 'vacationRentals' property as an array of any type

ngOnInit(): void {
  // when add vacationRental button is clicked, trigger this function getBooksByUserId()
  this.getAllCricketTournaments();
}

getAllCricketTournaments() {
  this.cricketTournamentService.getAllCricketTournaments().subscribe(
    (data) => {
      console.log(data);
      this.cricketTournaments = data;
    },
    (error) => {
      console.error('Error retrieving Cricket Tournaments', error);
    }
  );
}

viewInfo(vacationRental: any) {
  this.selectedItem = vacationRental;
  this.cricketTournamentService.getAllUsers().subscribe(users => {
    const user = users.find(user => user.userId === this.selectedItem.userId);
    if (user) {
      this.selectedItem.firstName = user.firstName;
      this.selectedItem.lastName = user.lastName;
      this.selectedItem.email = user.email;
      this.selectedItem.mobileNumber = user.mobileNumber;
    }
    console.log(this.selectedItem);
  });
  this.toggleModal();
}

toggleModal() {
  this.showModal = !this.showModal;
}

searchText: string = ''; // Declare the 'searchText' property as a string
sortValue: string = ''; // Declare the 'sortValue' property as a string
searchCricketTournaments() {
  this.cricketTournamentService.searchCricketTournaments(this.searchText).subscribe(eventResponse => {
    this.cricketTournaments = eventResponse;
  });
}

sortCricketTournaments() {
  this.cricketTournamentService.sortCricketTournaments(this.sortValue).subscribe(eventResponse => {
    this.cricketTournaments = eventResponse;
  });


}

}
