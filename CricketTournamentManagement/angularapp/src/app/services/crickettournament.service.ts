import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrl } from 'src/api.config';

@Injectable({
  providedIn: 'root'
})
export class CrickettournamentService {

  public apiUrl = apiUrl;

  constructor(private http: HttpClient) {}

  addCricketTournament(cricketTournamentData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/tournaments`, cricketTournamentData);
  }

  getCricketTournamentsByUserId(): Observable<any> {
    const userId = localStorage.getItem('userId');
    return this.http.get<any>(`${this.apiUrl}/api/tournaments/user/${userId}`);
  }

  updateCricketTournament(cricketTournamentData: any): Observable<any> {
    const id = cricketTournamentData.tournamentId;
    return this.http.put(`${this.apiUrl}/api/tournaments/${id}`, cricketTournamentData);
  }

  deleteCricketTournament(cricketTournamentData: any): Observable<any> {
    const id = cricketTournamentData.tournamentId;
    return this.http.delete(`${this.apiUrl}/api/tournaments/${id}`);
  }

  getAllCricketTournaments(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/tournaments`);
  }

  getCricketTournamentsById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/tournaments/${id}`);
  }

  searchCricketTournamentsByUserId(searchValue: string): Observable<any> {
    const userId = localStorage.getItem('userId');
    return this.http.get(`${this.apiUrl}/api/tournaments/user/${userId}`, { params: {userId, searchValue }});
  }

  getAllUsers(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/users`);
  }

  searchCricketTournaments(searchValue: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/tournaments`, { params: { searchValue }});
  }

  sortCricketTournaments(sortValue: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/tournaments`, { params: { sortValue }});
  }
}
