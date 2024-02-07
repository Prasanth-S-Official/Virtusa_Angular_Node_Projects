import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Event } from 'src/app/models/event.model';
import { EventmanagementService } from 'src/app/services/eventmanagement.service';

@Component({
  selector: 'app-organiser-dashboard',
  templateUrl: './organiser-dashboard.component.html',
  styleUrls: ['./organiser-dashboard.component.css'],
})
export class OrganiserDashboardComponent implements OnInit {
  showDeletePopup = false;
  selectedEvent: Event;
  showLogoutPopup = false;
  selectedItem: any = {};
  showModal: boolean = false;

  constructor(
    private router: Router,
    private eventManagementService: EventmanagementService
  ) {}

  navigateToAddEvent() {
    this.router.navigate(['/add-event']);
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

  events: any[] = []; // Declare the 'vacationRentals' property as an array of any type

  ngOnInit(): void {
    // when add vacationRental button is clicked, trigger this function getBooksByUserId()
    this.getEventManagementsByUserId();
  }

  navigateToEditEvent(eventId: { eventId: number }) {
    console.log('Event Id to be edited', eventId);
    this.router.navigate(['/edit-event', eventId.eventId]);
  }

  getEventManagementsByUserId() {
    this.eventManagementService.getEventManagementsByUserId().subscribe(
      (data) => {
        console.log(data);
        this.events = data;
      },
      (error) => {
        console.error('Error retrieving events', error);
      }
    );
  }

  deleteEventManagement(eventId: string) {
    this.eventManagementService.deleteEventManagement(eventId).subscribe(
      (response) => {
        console.log('Event deleted successfully', response);
        this.getEventManagementsByUserId();
      },
      (error) => {
        console.error('Error deleting event', error);
      }
    );
  }

  viewInfo(event: any) {
    console.log(event);
    this.selectedItem = event;
    this.toggleModal();
  }

  toggleModal() {
    this.showModal = !this.showModal;
  }

  searchText: string = ''; // Declare the 'searchText' property as a string
  sortValue: string = ''; // Declare the 'sortValue' property as a string
  searchEventManagementsByUserId() {
    this.eventManagementService
      .searchEventManagementsByUserId(this.searchText)
      .subscribe((event) => {
        this.events = event;
      });
  }
}
