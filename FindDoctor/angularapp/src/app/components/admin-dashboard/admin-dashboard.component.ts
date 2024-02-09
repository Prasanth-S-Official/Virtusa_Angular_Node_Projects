import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Doctor } from 'src/app/models/doctor.model';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  showDeletePopup = false;
  selectedDoctor: Doctor;
  showLogoutPopup = false;
  selectedItem: any = {};
  showModal: boolean = false;

  constructor(
    private router: Router,
    private doctorService: DoctorService
  ) {}

  navigateToAddDoctor() {
    this.router.navigate(['/add-doctor']);
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

  doctors: any[] = []; // Declare the 'vacationRentals' property as an array of any type

  ngOnInit(): void {
    // when add vacationRental button is clicked, trigger this function getBooksByUserId()
    this.getDoctorsByUserId();
  }

  navigateToEditDoctor(doctorId: { doctorId: number }) {
    console.log('Doctor Id to be edited', doctorId);
    this.router.navigate(['/edit-doctor', doctorId.doctorId]);
  }

  getDoctorsByUserId() {
    this.doctorService.getDoctorsByUserId().subscribe(
      (data) => {
        console.log(data);
        this.doctors = data;
      },
      (error) => {
        console.error('Error retrieving doctors', error);
      }
    );
  }

  deleteDoctor(doctorId: string) {
    this.doctorService.deleteDoctor(doctorId).subscribe(
      (response) => {
        console.log('Doctor deleted successfully', response);
        this.getDoctorsByUserId();
      },
      (error) => {
        console.error('Error deleting doctor', error);
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
  searchDoctorsByUserId() {
    this.doctorService
      .searchDoctorsByUserId(this.searchText)
      .subscribe((event) => {
        this.doctors = event;
      });
  }
}
