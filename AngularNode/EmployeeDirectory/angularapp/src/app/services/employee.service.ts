import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrl } from 'src/api.config';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  public apiUrl = apiUrl;

  constructor(private http: HttpClient) {}

  addEmployee(employeeData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/employee`, employeeData);
  }

  getEmployeesByUserId(): Observable<any> {
    const userId = localStorage.getItem('userId');
    return this.http.get<any>(`${this.apiUrl}/api/employee/user/${userId}`);
  }

  updateEmployee(employeeData: any): Observable<any> {
    const id = employeeData.employeeId;
    return this.http.put(`${this.apiUrl}/api/employee/${id}`, employeeData);
  }

  deleteEmployee(employeeData: any): Observable<any> {
    const id = employeeData.employeeId;
    return this.http.delete(`${this.apiUrl}/api/employee/${id}`);
  }

  getAllEmployees(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/employee`);
  }

  getEmployeeById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/employee/${id}`);
  }

  searchEmployeesByUserId(searchValue: string): Observable<any> {
    const userId = localStorage.getItem('userId');
    return this.http.get(`${this.apiUrl}/api/employee/user/${userId}`, { params: {userId, searchValue }});
  }

  getAllUsers(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/users`);
  }

  searchEmployees(searchValue: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/employee`, { params: { searchValue }});
  }

  sortEmployees(sortValue: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/employee`, { params: { sortValue }});
  }

}
