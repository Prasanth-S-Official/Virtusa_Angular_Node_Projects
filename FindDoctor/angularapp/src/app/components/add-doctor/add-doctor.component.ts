import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';
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
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      specialization: ['', Validators.required],
      experience: ['', Validators.required],
      location: ['', Validators.required],
      availability: this.fb.array([]),
      photo: [null, Validators.required],
    });
  }

  availability = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  handleCheckboxChange(event: Event, availability: string): void {
    const amenities = this.doctorForm.get('availability') as FormArray;
    if ((<HTMLInputElement>event.target).checked) {
      amenities.push(this.fb.control(availability));
    } else {
      let index = -1;
      amenities.controls.forEach((ctrl, i) => {
        if (ctrl.value === availability) {
          index = i;
        }
      });
      if (index > -1) {
        amenities.removeAt(index);
      }
    }
  }

  isAvailabilitySelected(availability: string): boolean {
    const availabilities = this.doctorForm.get('availability') as FormArray;
    return availabilities && availabilities.controls.some(control => control.value === availability);
  }

  onSubmit() {
    if (this.doctorForm.valid) {
      // Call the service method to post the product
      console.log(this.doctorForm.value);
      //pass userid from local storage
      // this.doctorForm.value.userId=localStorage.getItem('userId');
      this.doctor = new Doctor();
      this.doctor.firstName = this.doctorForm.get('firstName').value;
      this.doctor.lastName = this.doctorForm.get('lastName').value;
      this.doctor.specialization = this.doctorForm.get('specialization').value;
      this.doctor.experience = this.doctorForm.get('experience').value;
      this.doctor.location = this.doctorForm.get('location').value;
      this.doctor.availability = this.doctorForm.get('availability').value;
      this.doctor.photo = this.photoImage;
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
