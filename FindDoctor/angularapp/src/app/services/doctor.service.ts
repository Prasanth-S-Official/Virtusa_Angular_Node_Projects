import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrl } from 'src/api.config';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  public apiUrl = apiUrl;

  constructor(private http: HttpClient) {}

  addDoctor(doctorData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/doctor`, doctorData);
  }

  getDoctorsByUserId(): Observable<any> {
    const userId = localStorage.getItem('userId');
    return this.http.get<any>(`${this.apiUrl}/api/doctor/user/${userId}`);
  }

  updateDoctor(doctorData: any): Observable<any> {
    const id = doctorData.doctorId;
    return this.http.put(`${this.apiUrl}/api/doctor/${id}`, doctorData);
  }

  deleteDoctor(doctorData: any): Observable<any> {
    const id = doctorData.doctorId;
    return this.http.delete(`${this.apiUrl}/api/doctor/${id}`);
  }

  getAllDoctors(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/doctor`);
  }

  getDoctorById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/doctor/${id}`);
  }

  searchDoctorsByUserId(searchValue: string): Observable<any> {
    const userId = localStorage.getItem('userId');
    return this.http.get(`${this.apiUrl}/api/doctor/user/${userId}`, { params: {userId, searchValue }});
  }

  getAllUsers(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/users`);
  }

  searchDoctors(searchValue: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/doctor`, { params: { searchValue }});
  }

  sortDoctors(sortValue: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/doctor`, { params: { sortValue }});
  }

}
