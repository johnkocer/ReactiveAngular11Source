import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';

import Employee from '../models/employee.model';
import {EmployeeActions} from '../store/employee.action';
import {EmployeeState} from '../store/employee.state';
import { map } from 'rxjs/operators';
import { Update } from '@ngrx/entity';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  showEditor = true;
  myName: string;
  newEmployee: Employee;
  findEmployee: Employee;

  employeeList$: Observable<EmployeeState>;
  EmployeeSubscription: Subscription;
  EmployeeList: Employee[] = [];

  Title: string = '';
  IsCompleted: boolean = false;

  employeeError: Error = null;
  employeeToBeUpdated: Employee;

  constructor(private store: Store<{ employeeList: EmployeeState }>) {
    this.employeeList$ = store.pipe(select('employeeList'));

    this.newEmployee = new Employee();
    this.findEmployee = new Employee();
    this.findEmployee.name = '';
  }

  ngOnInit() {
    this.EmployeeSubscription = this.employeeList$
      .pipe(
        map(x => {
          this.EmployeeList = Object.values(x.entities).map((i) => Object.assign({},i));
          this.employeeError = x.EmployeeError;
        })
      )
      .subscribe();
    this.store.dispatch(EmployeeActions.GET());
  }

  employeeSeach() {
    console.log("employeeSeach -> this.findEmployee.name", this.findEmployee.name)

    if (!this.findEmployee.name.trim()) { return; }
   this.store.dispatch(EmployeeActions.SEARCH({text:this.findEmployee.name}))
  }

  public post(item: Employee) {
    const employee: Employee = this.newEmployee;
    this.store.dispatch(EmployeeActions.POST({ payload: employee }));
    this.Title = '';
    this.IsCompleted = false;
  }

  ngOnDestroy() {
    if (this.EmployeeSubscription) {
      this.EmployeeSubscription.unsubscribe();
    }
  }

  public put(item: Employee) {
    this.employeeToBeUpdated = item;
    const payload: Update<Employee> = {
      id: item.id,

      changes: {
        ...this.employeeToBeUpdated,
      }
    };
    this.store.dispatch(EmployeeActions.PUT( {payload}));
    this.Title = '';
    this.IsCompleted = false;

  }

  public delete(employee: Employee) {
   this.store.dispatch(EmployeeActions.DELETE({id:employee.id}))
  }

  get() {
   this.store.dispatch(EmployeeActions.FIND_ID({id:this.findEmployee.id}))
  }
}
