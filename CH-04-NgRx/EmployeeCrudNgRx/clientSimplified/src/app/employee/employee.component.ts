import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';

import Employee from '../store/employee.model';
import {DbActions} from '../store/employee.action';
import IDb from '../store/employee.state';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  //showEditor = true;
 // myName: string;
  newEmployee: Employee;
  findEmployee: Employee;

  employeeList$: Observable<IDb>;
  EmployeeSubscription: Subscription;
  EmployeeList: Employee[] = [];

  readonly titleStatic: string = 'Employee CRUD Angular Service Layers: Redux, RxJs and Ngrx Store ! ';
  Title: string = this.titleStatic;
  IsCompleted: boolean = false;

  employeeError: Error = null;
  constructor(private store: Store<{ db: IDb }>) {
    this.employeeList$ = store.pipe(select('db'));

    this.newEmployee = new Employee();
    this.findEmployee = new Employee();
    this.findEmployee.name = '';
  }

  ngOnInit() {
this.Title="Loading Employees!"

    this.EmployeeSubscription = this.employeeList$
      .pipe(
        map(x => {
          this.EmployeeList = x.EmployeeList.map((i) => Object.assign({},i));
          this.employeeError = x.EmployeeError;
this.Title="Employees loaded!"
this.wait()
        })
      )
      .subscribe();

    this.store.dispatch(DbActions.GET());
  }

  employeeSeach() {
    console.log("employeeSeach -> this.findEmployee.name", this.findEmployee.name)

    if (!this.findEmployee.name.trim()) { return; }

   this.store.dispatch(DbActions.SEARCH({text:this.findEmployee.name}))
  }

  public post(item: Employee) {
    const employee: Employee = this.newEmployee;
    this.store.dispatch(DbActions.POST({ payload: employee }));
    this.Title = '';
    this.IsCompleted = false;
  }

  ngOnDestroy() {
    if (this.EmployeeSubscription) {
      this.EmployeeSubscription.unsubscribe();
    }
  }

  public put(item: Employee) {
    this.store.dispatch(DbActions.PUT({payload: item}));
    this.Title = '';
    this.IsCompleted = false;
  }

  public delete(employee: Employee) {
   this.store.dispatch(DbActions.DELETE({id:employee.id}))
  }

  get() {
   this.store.dispatch(DbActions.FIND_ID({id:this.findEmployee.id}))
  }

  wait() {
    return new Promise(resolve => {
      setTimeout(() => {
            this.Title=this.titleStatic;
      }, 4000);
    });
  }
}
