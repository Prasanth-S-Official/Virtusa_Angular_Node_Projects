import { Component, OnInit } from '@angular/core';
import { Doctor } from 'src/app/models/doctor.model';
import { AuthService } from 'src/app/services/auth.service';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-patient-dashboard',
  templateUrl: './patient-dashboard.component.html',
  styleUrls: ['./patient-dashboard.component.css']
})
export class PatientDashboardComponent implements OnInit {
  selectedDoctor: Doctor;
  showLogoutPopup = false;
  selectedItem: any = {};
  showModal: boolean = false;

  constructor(private doctorService: DoctorService, private authService: AuthService) { }

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
    this.getAllDoctors();
  }

  getAllDoctors() {
    this.doctorService.getAllDoctors().subscribe(
      (data) => {
       
        this.doctors = data;
      },
      (error) => {
        console.error('Error retrieving vacationRentals', error);
      }
    );
  }

  viewInfo(doctor: any) {
    this.selectedItem = doctor;
    console.log(this.selectedItem)
    this.authService.getAllUsers().subscribe(users => {
      console.log(users)
      const user = users.find(user => user.userId === this.selectedItem.userId);
      if (user) {
        this.selectedItem.firstName = user.firstName;
        this.selectedItem.lastName = user.lastName;
        this.selectedItem.email = user.email;
        this.selectedItem.mobileNumber = user.mobileNumber;
      }
      console.log('sdfgh',this.selectedItem);
    });
    this.toggleModal();
  }

  toggleModal() {
    this.showModal = !this.showModal;
    console.log(this.getAllDoctors)
  }

  searchText: string = ''; // Declare the 'searchText' property as a string
  sortValue: string = ''; // Declare the 'sortValue' property as a string
  searchDoctors() {
    this.doctorService.searchDoctors(this.searchText).subscribe(eventResponse => {
      this.doctors = eventResponse;
    });
  }

  sortDoctors() {
    this.doctorService.sortDoctors(this.sortValue).subscribe(eventResponse => {
      this.doctors = eventResponse;
    });


  }



}
