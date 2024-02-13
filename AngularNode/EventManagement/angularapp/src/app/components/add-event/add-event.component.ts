import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Event } from 'src/app/models/event.model';
import { EventmanagementService } from 'src/app/services/eventmanagement.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent {
  eventForm: FormGroup;
  event: Event
  photoImage="";
  errorMessage = '';

  constructor(private fb: FormBuilder, private eventManagementService: EventmanagementService, private route:Router) {
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
      this.event = new Event();
      this.event.title = this.eventForm.get('title').value;
      this.event.category = this.eventForm.get('category').value;
      this.event.description = this.eventForm.get('description').value;
      this.event.startDate = this.eventForm.get('startDate').value;
      this.event.location = this.eventForm.get('location').value;
      this.event.endDate = this.eventForm.get('endDate').value;
      this.event.coverImage = this.photoImage;
      this.event.userId = localStorage.getItem('userId');
      this.eventManagementService.addEventManagement(this.event).subscribe(
        (response) => {
          // Handle success if needed
          console.log('event added successfully', response);
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

  handleFileChange(event: any): void {
    const file = event.target.files[0];

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
