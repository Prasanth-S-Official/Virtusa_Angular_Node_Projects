import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';


@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {

  
  employee: any = {};
  photoImage="";
  constructor(private route: ActivatedRoute, private employeeService: EmployeeService, private router: Router) { }

  categories = ['Male', 'Female'];

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
    this.employeeService.getEventManagementById(id).subscribe(
      (response) => {
        this.employee = response;
        this.employee.startDate = this.getFormattedDate(this.employee.startDate);
        console.log(response)
      },
      (error) => {
        console.error('Error retrieving employee', error);
      }
    );
  }

  updateEventManagement() {
    this.employee.coverImage=this.photoImage;
    this.employeeService.updateEventManagement(this.employee).subscribe(
      (response) => {
        console.log('Event updated successfully', response);
        //navigate to seller dashboard
        this.router.navigate(['/organiser-dashboard']);
      },
      (error) => {
        console.error('Error updating employee', error);
      }
    );
 }

 
 goBack(): void {
  // Navigate to the dashboard or any desired route
  this.router.navigate(['/admin-dashboard']);
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



}
