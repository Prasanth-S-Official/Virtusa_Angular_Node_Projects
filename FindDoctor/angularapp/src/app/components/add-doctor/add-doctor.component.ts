import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DoctorService } from 'src/app/services/doctor.service';
import { Doctor } from 'src/app/models/doctor.model';

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.css']
})
export class AddDoctorComponent {
  doctorForm: FormGroup;
  doctor: Doctor
  photoImage="";
  errorMessage = '';

  constructor(private fb: FormBuilder, private doctorService: DoctorService, private route:Router) {
    this.doctorForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      location: ['', Validators.required],
      coverImage: [null, Validators.required],
    });
  }

  categories = ['House', 'Apartment', 'Villa', 'Cabin', 'Condo', 'Other'];

  onSubmit() {
    if (this.doctorForm.valid) {
      // Call the service method to post the product
      console.log(this.doctorForm.value);
      //pass userid from local storage
      // this.doctorForm.value.userId=localStorage.getItem('userId');
      this.doctor = new Doctor();
      this.doctor.title = this.doctorForm.get('title').value;
      this.doctor.category = this.doctorForm.get('category').value;
      this.doctor.description = this.doctorForm.get('description').value;
      this.doctor.startDate = this.doctorForm.get('startDate').value;
      this.doctor.location = this.doctorForm.get('location').value;
      this.doctor.endDate = this.doctorForm.get('endDate').value;
      this.doctor.coverImage = this.photoImage;
      this.doctor.userId = localStorage.getItem('userId');
      this.doctorService.addDoctor(this.doctor).subscribe(
        (response) => {
          // Handle success if needed
          console.log('doctor added successfully', response);
          this.doctorForm.reset(); // Reset the form
          this.route.navigate(['/admin-dashboard']);
        },
        (error) => {
          // Handle error if needed
          console.error('Error adding product', error);
        }
      );
    }else{
      this.errorMessage = "All fields are required"
    }
  }

  handleFileChange(doctor: any): void {
    const file = doctor.target.files[0];

    if (file) {
      this.convertFileToBase64(file).then(
        (base64String) => {
          this.photoImage=base64String
        },
        (error) => {
          console.error('Error converting file to base64:', error);
          // Handle error appropriately
        }
      );
    }
  }

  convertFileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result as string);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(file);
    });
  }

  goBack() {
    // Navigate to the dashboard or any desired route
    this.route.navigate(['/admin-dashboard']);
  }


}
