import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CrickettournamentService } from 'src/app/services/crickettournament.service';

@Component({
  selector: 'app-edit-tournament',
  templateUrl: './edit-tournament.component.html',
  styleUrls: ['./edit-tournament.component.css']
})
export class EditTournamentComponent implements OnInit {

  cricketTournament: any = {};
  photoImage="";
  constructor(private route: ActivatedRoute, private cricketTournamentService: CrickettournamentService, private router: Router) { }

  categories = ['House', 'Apartment', 'Villa', 'Cabin', 'Condo', 'Other'];

  ngOnInit() {
    const tournamentId = this.route.snapshot.paramMap.get('id');
    console.log('Cricket Tournament Id to be edited', tournamentId);
    this.getCricketTournamentsById(tournamentId);
  }

getFormattedDate(dateString: string): string {
    const date = new Date(dateString);
    const formattedDate = date.toISOString().substring(0, 10); // "yyyy-MM-dd"
    return formattedDate;
  }
  

  getCricketTournamentsById(id: string) {
    this.cricketTournamentService.getCricketTournamentsById(id).subscribe(
      (response) => {
        this.cricketTournament = response;
        this.cricketTournament.startDate = this.getFormattedDate(this.cricketTournament.startDate);
        this.cricketTournament.endDate = this.getFormattedDate(this.cricketTournament.endDate);
        console.log(response)
      },
      (error) => {
        console.error('Error retrieving cricket tournament', error);
      }
    );
  }

  updateCricketTournament() {
    this.cricketTournament.coverImage=this.photoImage;
    this.cricketTournamentService.updateCricketTournament(this.cricketTournament).subscribe(
      (response) => {
        console.log('Cricket tournament updated successfully', response);
        //navigate to seller dashboard
        this.router.navigate(['/organiser-dashboard']);
      },
      (error) => {
        console.error('Error updating cricket tournament', error);
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
