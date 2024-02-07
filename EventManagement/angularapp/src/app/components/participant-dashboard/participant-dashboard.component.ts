import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Event } from 'src/app/models/event.model';
import { EventmanagementService } from 'src/app/services/eventmanagement.service';

@Component({
  selector: 'app-participant-dashboard',
  templateUrl: './participant-dashboard.component.html',
  styleUrls: ['./participant-dashboard.component.css']
})
export class ParticipantDashboardComponent implements OnInit {

  showDeletePopup = false;
  selectedEvent: Event; 
  showLogoutPopup = false;
  selectedItem: any = {};
  showModal: boolean = false;
  
  constructor(private router: Router,private eventManagementService: EventmanagementService ) { }

  navigateToAddRental() {
    this.router.navigate(['/add-rental']);
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
  this.getAllEventManagement();
}

getAllEventManagement() {
  this.eventManagementService.getAllEventManagement().subscribe(
    (data) => {
      console.log(data);
      this.events = data;
    },
    (error) => {
      console.error('Error retrieving vacationRentals', error);
    }
  );
}

viewInfo(vacationRental: any) {
  this.selectedItem = vacationRental;
  this.eventManagementService.getAllUsers().subscribe(users => {
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
searchEventManagements() {
  this.eventManagementService.searchEventManagements(this.searchText).subscribe(eventResponse => {
    this.events = eventResponse;
  });
}

sortEventManagements() {
  this.eventManagementService.sortEventManagements(this.sortValue).subscribe(eventResponse => {
    this.events = eventResponse;
  });


}

}
