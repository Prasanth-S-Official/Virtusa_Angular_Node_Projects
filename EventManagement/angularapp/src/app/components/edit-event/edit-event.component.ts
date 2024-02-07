import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventmanagementService } from 'src/app/services/eventmanagement.service';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent implements OnInit {

  event: any = {};
  photoImage="";
  constructor(private route: ActivatedRoute, private eventManagementService: EventmanagementService, private router: Router) { }

  categories = ['House', 'Apartment', 'Villa', 'Cabin', 'Condo', 'Other'];

  ngOnInit() {
    const eventId = this.route.snapshot.paramMap.get('id');
    console.log('Event Ids to be edited', eventId);
    this.getEventManagementById(eventId);
  }

getFormattedDate(dateString: string): string {
    const date = new Date(dateString);
    const formattedDate = date.toISOString().substring(0, 10); // "yyyy-MM-dd"
    return formattedDate;
  }
  

  getEventManagementById(id: string) {
    this.eventManagementService.getEventManagementById(id).subscribe(
      (response) => {
        this.event = response;
        this.event.startDate = this.getFormattedDate(this.event.startDate);
        this.event.endDate = this.getFormattedDate(this.event.endDate);
        console.log(response)
      },
      (error) => {
        console.error('Error retrieving mobile', error);
      }
    );
  }

  updateEventManagement() {
    this.event.coverImage=this.photoImage;
    this.eventManagementService.updateEventManagement(this.event).subscribe(
      (response) => {
        console.log('Event updated successfully', response);
        //navigate to seller dashboard
        this.router.navigate(['/organiser-dashboard']);
      },
      (error) => {
        console.error('Error updating mobile', error);
      }
    );
 }

 
 goBack(): void {
  // Navigate to the dashboard or any desired route
  this.router.navigate(['/organiser-dashboard']);
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



}
