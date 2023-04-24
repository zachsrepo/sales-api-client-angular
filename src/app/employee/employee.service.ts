import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from './employee.class';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  baseurl: string = "http://localhost:5000/api/employees";
  
  constructor(
    private http: HttpClient
  ) { }

  list(): Observable<Employee[]> {
    return this.http.get(`${this.baseurl}`) as Observable<Employee[]>;
  }
  get(id: number): Observable<Employee> {
    return this.http.get(`${this.baseurl}/${id}`) as Observable<Employee>;
  }
  login(email: string, password: string): Observable<Employee>{
    return this.http.get(`${this.baseurl}/login/${email}/${password}`) as Observable<Employee>;
  }
  create(employee: Employee): Observable<Employee> {
    return this.http.post(`${this.baseurl}`, employee) as Observable<Employee>;
  }
  change(employee: Employee): Observable<any>{
    return this.http.put(`${this.baseurl}/${employee.id}`, employee) as Observable<any>;
  }
  remove(id: number): Observable<any> {
    return this.http.delete(`${this.baseurl}/${id}`) as Observable<any>;
  }

}
