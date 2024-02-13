import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrickettournamentService } from 'src/app/services/crickettournament.service';
import { CricketTournament } from 'src/app/models/crickettournament.model';

@Component({
  selector: 'app-add-tournament',
  templateUrl: './add-tournament.component.html',
  styleUrls: ['./add-tournament.component.css']
})
export class AddTournamentComponent {

  cricketTournamentForm: FormGroup;
  cricketTournament: CricketTournament
  photoImage="";
  errorMessage = '';

  constructor(private fb: FormBuilder, private cricketTournamentService: CrickettournamentService, private route:Router) {
    this.cricketTournamentForm = this.fb.group({
      tournamentName: ['', Validators.required],
      rules: ['', Validators.required],
      prize: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      location: ['', Validators.required],
      coverImage: [null, Validators.required],
    });
  }

  categories = ['House', 'Apartment', 'Villa', 'Cabin', 'Condo', 'Other'];

  onSubmit() {
    if (this.cricketTournamentForm.valid) {
      // Call the service method to post the product
      console.log(this.cricketTournamentForm.value);
      //pass userid from local storage
      // this.cricketTournamentForm.value.userId=localStorage.getItem('userId');
      this.cricketTournament = new CricketTournament();
      this.cricketTournament.tournamentName = this.cricketTournamentForm.get('tournamentName').value;
      this.cricketTournament.rules = this.cricketTournamentForm.get('rules').value;
      this.cricketTournament.prize = this.cricketTournamentForm.get('prize').value;
      this.cricketTournament.startDate = this.cricketTournamentForm.get('startDate').value;
      this.cricketTournament.location = this.cricketTournamentForm.get('location').value;
      this.cricketTournament.endDate = this.cricketTournamentForm.get('endDate').value;
      this.cricketTournament.coverImage = this.photoImage;
      this.cricketTournament.userId = localStorage.getItem('userId');
      this.cricketTournamentService.addCricketTournament(this.cricketTournament).subscribe(
        (response) => {
          // Handle success if needed
          console.log('cricketTournament added successfully', response);
          this.cricketTournamentForm.reset(); // Reset the form
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
