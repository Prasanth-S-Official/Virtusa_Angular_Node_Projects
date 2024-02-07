import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrl } from 'src/api.config';

@Injectable({
  providedIn: 'root'
})
export class EventmanagementService {

  public apiUrl = apiUrl;

  constructor(private http: HttpClient) {}

  addEventManagement(eventData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/event`, eventData);
  }

  getEventManagementsByUserId(): Observable<any> {
    const userId = localStorage.getItem('userId');
    return this.http.get<any>(`${this.apiUrl}/api/event/user/${userId}`);
  }

  updateEventManagement(eventData: any): Observable<any> {
    const id = eventData.eventId;
    return this.http.put(`${this.apiUrl}/api/event/${id}`, eventData);
  }

  deleteEventManagement(eventData: any): Observable<any> {
    const id = eventData.eventId;
    return this.http.delete(`${this.apiUrl}/api/event/${id}`);
  }

  getAllEventManagement(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/event`);
  }

  getEventManagementById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/event/${id}`);
  }

  searchEventManagementsByUserId(searchValue: string): Observable<any> {
    const userId = localStorage.getItem('userId');
    return this.http.get(`${this.apiUrl}/api/event/user/${userId}`, { params: {userId, searchValue }});
  }

  getAllUsers(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/users`);
  }

  searchEventManagements(searchValue: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/event`, { params: { searchValue }});
  }

  sortEventManagements(sortValue: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/event`, { params: { sortValue }});
  }
}
