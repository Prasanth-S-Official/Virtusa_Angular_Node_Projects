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

  eventForm: FormGroup;
  employee: Employee
  photoImage="";
  errorMessage = '';

  constructor(private fb: FormBuilder, private employeeService: EmployeeService, private route:Router) {
    this.eventForm = this.fb.group({
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
    if (this.eventForm.valid) {
      // Call the service method to post the product
      console.log(this.eventForm.value);
      //pass userid from local storage
      // this.eventForm.value.userId=localStorage.getItem('userId');
      this.employee = new Employee();
      this.employee.firstName = this.eventForm.get('title').value;
      this.employee.category = this.eventForm.get('category').value;
      this.employee.description = this.eventForm.get('description').value;
      this.employee.startDate = this.eventForm.get('startDate').value;
      this.employee.location = this.eventForm.get('location').value;
      this.employee.endDate = this.eventForm.get('endDate').value;
      this.employee.coverImage = this.photoImage;
      this.employee.userId = localStorage.getItem('userId');
      this.eventManagementService.addEventManagement(this.employee).subscribe(
        (response) => {
          // Handle success if needed
          console.log('employee added successfully', response);
          this.eventForm.reset(); // Reset the form
          this.route.navigate(['/organiser-dashboard']);
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
