import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {
  showDeletePopup = false;
  showLogoutPopup = false;
  selectedItem: any = {};
  showModal: boolean = false;
  
  constructor(private employeeService: EmployeeService ) { }

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

  employees: any[] = []; // Declare the 'vacationRentals' property as an array of any type

ngOnInit(): void {
  // when add vacationRental button is clicked, trigger this function getBooksByUserId()
  this.getAllEmployees();
}

getAllEmployees() {
  this.employeeService.getAllEmployees().subscribe(
    (data) => {
      console.log(data);
      this.employees = data;
    },
    (error) => {
      console.error('Error retrieving employees', error);
    }
  );
}

viewInfo(vacationRental: any) {
  this.selectedItem = vacationRental;
  this.employeeService.getAllUsers().subscribe(users => {
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
searchEmployees() {
  this.employeeService.searchEmployees(this.searchText).subscribe(eventResponse => {
    this.employees = eventResponse;
  });
}

sortEmployees() {
  this.employeeService.sortEmployees(this.sortValue).subscribe(eventResponse => {
    this.employees = eventResponse;
  });


}
}
