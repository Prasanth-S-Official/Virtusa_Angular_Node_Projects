import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CricketTournament } from 'src/app/models/crickettournament.model';
import { CrickettournamentService } from 'src/app/services/crickettournament.service';

@Component({
  selector: 'app-organiser-dashboard',
  templateUrl: './organiser-dashboard.component.html',
  styleUrls: ['./organiser-dashboard.component.css']
})
export class OrganiserDashboardComponent implements OnInit {
  showDeletePopup = false;
  selectedCricketTournament: CricketTournament;
  showLogoutPopup = false;
  selectedItem: any = {};
  showModal: boolean = false;

  constructor(
    private router: Router,
    private cricketTournamentService: CrickettournamentService
  ) {}

  navigateToAddTournament() {
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
    this.getCricketTournamentsByUserId();
  }

  navigateToEditTournament(cricketTournamentId: { tournamentId: number }) {
    console.log('CricketTournament Id to be edited', cricketTournamentId);
    this.router.navigate(['/edit-tournament', cricketTournamentId.tournamentId]);
  }

  getCricketTournamentsByUserId() {
    this.cricketTournamentService.getCricketTournamentsByUserId().subscribe(
      (data) => {
        console.log(data);
        this.cricketTournaments = data;
      },
      (error) => {
        console.error('Error retrieving cricket tournaments', error);
      }
    );
  }

  deleteCricketTournament(CricketTournamentId: string) {
    this.cricketTournamentService.deleteCricketTournament(CricketTournamentId).subscribe(
      (response) => {
        console.log('CricketTournament deleted successfully', response);
        this.getCricketTournamentsByUserId();
      },
      (error) => {
        console.error('Error deleting cricket tournament', error);
      }
    );
  }

  viewInfo(CricketTournament: any) {
    console.log(CricketTournament);
    this.selectedItem = CricketTournament;
    this.toggleModal();
  }

  toggleModal() {
    this.showModal = !this.showModal;
  }

  searchText: string = ''; // Declare the 'searchText' property as a string
  sortValue: string = ''; // Declare the 'sortValue' property as a string
  searchCricketTournamentsByUserId() {
    this.cricketTournamentService
      .searchCricketTournamentsByUserId(this.searchText)
      .subscribe((CricketTournament) => {
        this.cricketTournaments = CricketTournament;
      });
  }

}
