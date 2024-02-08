import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/models/employee.model';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent {

  employeeForm: FormGroup;
  employee: Employee
  photoImage="";
  errorMessage = '';

  constructor(private fb: FormBuilder, private employeeService: EmployeeService, private route:Router) {
    this.employeeForm = this.fb.group({
      firstName: ['', Validators.required],
  lastName: ['', Validators.required],
  mobileNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
  mailId: ['', [Validators.required, Validators.pattern(/^[a-z]+@[a-z]+\.[a-z]+$/)]],
  dateOfBirth: ['', Validators.required],
  age: ['', Validators.required],
  gender: ['', Validators.required],
  education: ['', Validators.required],
  experience: ['', Validators.required],
  photo: [null, Validators.required],
    });
  }

  genders = ['Male', 'Female'];

  onSubmit() {
    if (this.employeeForm.valid) {
      // Call the service method to post the product
      console.log(this.employeeForm.value);
      //pass userid from local storage
      // this.employeeForm.value.userId=localStorage.getItem('userId');
      this.employee = new Employee();
      this.employee.firstName = this.employeeForm.get('firstName').value;
      this.employee.lastName = this.employeeForm.get('lastName').value;
      this.employee.mobileNumber = this.employeeForm.get('mobileNumber').value;
      this.employee.mailId = this.employeeForm.get('mailId').value;
      this.employee.dateOfBirth = this.employeeForm.get('dateOfBirth').value;
      this.employee.age = this.employeeForm.get('age').value;
      this.employee.gender = this.employeeForm.get('gender').value;
      this.employee.education = this.employeeForm.get('education').value;
      this.employee.experience = this.employeeForm.get('experience').value;
      this.employee.photo = this.photoImage;
      this.employee.userId = localStorage.getItem('userId');
      this.employeeService.addEmployee(this.employee).subscribe(
        (response) => {
          // Handle success if needed
          console.log('Employee added successfully', response);
          this.employeeForm.reset(); // Reset the form
          this.route.navigate(['/admin-dashboard']);
        },
        (error) => {
          // Handle error if needed
          console.error('Error adding employee', error);
        }
      );
    }else{
      this.errorMessage = "All fields are required"
    }
  }

  handleFileChange(employee: any): void {
    const file = employee.target.files[0];

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
    this.route.navigate(['/organiser-dashboard']);
  }



}
