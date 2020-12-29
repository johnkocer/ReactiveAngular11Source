import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { Employee } from '../models/employee';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private _apiUrl = 'http://localhost:5000/api/Employees';
  constructor(private http: HttpClient) {}

  reads(): Promise<Employee[]> {
    return this.http.get<Employee[]>(this._apiUrl, httpOptions).toPromise();
  }

  read(id: number): Promise<Employee> {
    const url = `${this._apiUrl}/${id}`;
    return this.http.get<Employee>(url).toPromise();
  }

  filter(name: string): Promise<Employee[]> {
    if (!name.trim()) {
      // if not search term, return empty employee array.
      return of([]).toPromise();
    }
    // let url=this.employeesUrl+ 'ByName'
    let url=`${this._apiUrl}/byName/${name}`;
    // let url=`${this.employeesUrl}/${name}`;
    return this.http.get<Employee[]>(url).toPromise();
  }

  create(employee: Employee): Promise<Employee> {
    return this.http.post<Employee>(this._apiUrl, employee, httpOptions).toPromise();
  }

  delete(id: number): Promise<Employee> {
    return this.http.delete<Employee>(
      this._apiUrl + '/' + id,
      httpOptions
    ).toPromise();
  }

  update(employee: Employee): Promise<Employee> {
    return this.http.put<Employee>(
      this._apiUrl + '/' + employee.id,
      employee,
      httpOptions
    ).toPromise();
  }
}


