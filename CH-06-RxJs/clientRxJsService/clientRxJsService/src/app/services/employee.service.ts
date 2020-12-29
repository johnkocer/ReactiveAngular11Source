import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import Employee from '../employee.model';
import { Injectable } from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  // private ApiURL: string = 'https://localhost:44308/api/Employee';
  private _apiEmployeeUrl: string = 'http://localhost:5000/api/Employees/';
  constructor(private http: HttpClient) {}

  index(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this._apiEmployeeUrl);
  }

  post(payload: Employee): Observable<Employee> {
    return this.http.post<Employee>(this._apiEmployeeUrl, JSON.stringify(payload), httpOptions);
  }

   put(payload: Employee): Observable<Employee> {
    return this.http.put<Employee>(this._apiEmployeeUrl + payload.id, payload, httpOptions);
  }

  search(term: string): Observable<Employee[]> {
    if (!term.trim()) {
      // if not search term, return empty employee array.
      return of([]);
    }
    let url= this._apiEmployeeUrl + 'byName'
    return this.http.get<Employee[]>(`${url}/${term}`);
  }

  delete(id: number): Observable<Employee> {
    return this.http.delete<Employee>(this._apiEmployeeUrl + id, httpOptions );
  }

  getById(id: number): Observable<Employee> {
    const url = `${this._apiEmployeeUrl}${id}`;
    return this.http.get<Employee>(url);
  }
}
