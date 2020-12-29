import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { Todo } from '../models/todo';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private _apiUrl = 'http://localhost:5000/api/Todos';
  constructor(private http: HttpClient) {}

  reads(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this._apiUrl, httpOptions);
  }

  read(id: number): Observable<Todo> {
    const url = `${this._apiUrl}/${id}`;
    return this.http.get<Todo>(url);
  }

  filter(name: string): Observable<Todo[]> {
    if (!name.trim()) {
      // if not search term, return empty todo array.
      return of([]);
    }
    // let url=this.todosUrl+ 'ByName'
    let url=`${this._apiUrl}/byName/${name}`;
    // let url=`${this.todosUrl}/${name}`;
    return this.http.get<Todo[]>(url);
  }

  create(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this._apiUrl, todo, httpOptions);
  }

  delete(id: number): Observable<Todo> {
    return this.http.delete<Todo>(
      this._apiUrl + '/' + id,
      httpOptions
    );
  }

  update(todo: Todo): Observable<Todo> {
    return this.http.put<Todo>(
      this._apiUrl + '/' + todo.id,
      todo,
      httpOptions
    );
  }
}
