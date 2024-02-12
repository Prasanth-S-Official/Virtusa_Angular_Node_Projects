import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-edit-doctor',
  templateUrl: './edit-doctor.component.html',
  styleUrls: ['./edit-doctor.component.css']
})
export class EditDoctorComponent implements OnInit {
  doctor: any = {};
  photoImage="";
  constructor(private route: ActivatedRoute, private doctorService: DoctorService, private router: Router) { }

  availabilities = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  ngOnInit() {
    const doctorId = this.route.snapshot.paramMap.get('id');
    console.log('Doctor Ids to be edited', doctorId);
    this.getDoctorById(doctorId);
  }

  handleCheckboxChange(event: any, availability: string): void {
    if (event.target.checked) {
      // Add amenity to the array if checked
      this.doctor.availabilities.push(availability);
    } else {
      // Remove amenity from the array if unchecked
      const index = this.doctor.availabilities.indexOf(availability);
      if (index !== -1) {
        this.doctor.availabilities.splice(index, 1);
      }
    }
  }

  getDoctorById(id: string) {
    this.doctorService.getDoctorById(id).subscribe(
      (response) => {
        this.doctor = response;
        console.log(response)
      },
      (error) => {
        console.error('Error retrieving mobile', error);
      }
    );
  }

  updateDoctor() {
    this.doctor.photo=this.photoImage;
    this.doctorService.updateDoctor(this.doctor).subscribe(
      (response) => {
        console.log('Vacation Rental updated successfully', response);
        //navigate to seller dashboard
        this.router.navigate(['/owner-dashboard']);
      },
      (error) => {
        console.error('Error updating mobile', error);
      }
    );
 }

 
 goBack(): void {
  // Navigate to the dashboard or any desired route
  this.router.navigate(['/admin-dashboard']);
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
