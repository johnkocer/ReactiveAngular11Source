import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of } from "rxjs";
import { tap } from "rxjs/operators";
import { Clog } from '../shared';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(
    private http: HttpClient
  ) { }

 getContacts():Observable<Object> {
   console.log("getContacts " +environment.apiUrl)
   let url=`${environment.apiUrl}/contacts`
    return this.http.get(url).pipe(
      tap((r) => {
        if (!environment.production) {
          Clog(r,`ContactService  GET [${url}] [ContactList]`)
        }
      })
    );
  }
  addContact(data) {
    let url=`${environment.apiUrl}/contacts`
    return this.http.post(url, data).pipe(
      tap((r) => {
        if (!environment.production) {
          console.table(r);
          Clog(r,`ContactService  [${url}] [POST]  ${r}`)
        }
      })
    );
  }

  editContact(data) {
    let url=`${environment.apiUrl}/contacts/${data.id}`
    return this.http.put(url, data).pipe(
      tap((r) => {
        if (!environment.production) {
          console.groupCollapsed(`ContactService  [${url}] [PUT]  ${r}` );
          console.table(r);
          console.groupEnd();
        }
      })
    );
  }

  deleteContact(id) {
    let url=`${environment.apiUrl}/contacts/${id}`
    return this.http.delete(url).pipe(
      tap((r) => {
        if (!environment.production) {
          console.groupCollapsed(`ContactService  [${url}] [DELETE]  ${r}` );
          console.table(r);
          console.groupEnd();
        }
      })
    );
  }
}
