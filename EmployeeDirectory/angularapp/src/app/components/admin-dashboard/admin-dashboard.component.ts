import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  showDeletePopup = false;
  selectedEmployee: Employee;
  showLogoutPopup = false;
  selectedItem: any = {};
  showModal: boolean = false;

  constructor(
    private router: Router,
    private employeeService: EmployeeService
  ) {}

  navigateToAddEmployee() {
    this.router.navigate(['/add-employee']);
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

  employees: any[] = []; // Declare the 'vacationRentals' property as an array of any type

  ngOnInit(): void {
    // when add vacationRental button is clicked, trigger this function getBooksByUserId()
    this.getEmployeesByUserId();
  }

  navigateToEditEmployee(employeeId: { employeeId: number }) {
    console.log('Employee Id to be edited', employeeId);
    this.router.navigate(['/edit-employee', employeeId.employeeId]);
  }

  getEmployeesByUserId() {
    this.employeeService.getEmployeesByUserId().subscribe(
      (data) => {
        console.log(data);
        this.employees = data;
      },
      (error) => {
        console.error('Error retrieving employees', error);
      }
    );
  }

  deleteEmployee(employeeId: string) {
    this.employeeService.deleteEmployee(employeeId).subscribe(
      (response) => {
        console.log('Employee deleted successfully', response);
        this.getEmployeesByUserId();
      },
      (error) => {
        console.error('Error deleting employee', error);
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
  searchEmployeesByUserId() {
    this.employeeService
      .searchEmployeesByUserId(this.searchText)
      .subscribe((event) => {
        this.employees = event;
      });
  }
}
