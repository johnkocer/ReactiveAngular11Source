import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';

import Employee from '../store/employee.model';
import {EmployeeActions} from '../store/employee.action';
import EmployeeState from '../store/employee.state';
import { map } from 'rxjs/operators';
import { EmployeeService } from '../services/employee.service';

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
  constructor(private store: Store<{ employeeList: EmployeeState }>,private dataService: EmployeeService) {
    this.employeeList$ = store.pipe(select('employeeList'));

    this.newEmployee = new Employee();
    this.findEmployee = new Employee();
    this.findEmployee.name = '';
  }

  ngOnInit() {
    this.EmployeeSubscription = this.employeeList$
      .pipe(
        map(x => {
          this.EmployeeList = x.EmployeeList.map((i) => Object.assign({},i));
          this.employeeError = x.EmployeeError;
        })
      )
      .subscribe();

    this.store.dispatch(EmployeeActions.GET());
  }

  employeeSeach() {
    console.log("employeeSeach -> this.findEmployee.name", this.findEmployee.name)

    if (!this.findEmployee.name.trim()) { return; }

    // this.dataService.search(this.findEmployee.name).subscribe(
    //   (data: Employee[]) => {
    //     this.EmployeeList = data;
    //   },
    //   error => {
    //     console.log('could not get Employees', error);
    //     this.EmployeeList = null;
    //   }
    // );

   this.store.dispatch(EmployeeActions.SEARCH({text:this.findEmployee.name}))
  }

  // search() {
  //   this.dataService.get().subscribe(
  //     (data: Employee[]) => {
  //       this.EmployeeList = data;
  //     },
  //     error => {
  //       console.log('could not get Employees', error);
  //       this.EmployeeList = null;
  //     }
  //   );
  // }

  // public post(item: Employee) {
  //   this.dataService.post(this.newEmployee).subscribe(
  //     (data: Employee) => {
  //       this.EmployeeList.push(data);
  //     },
  //     error => {
  //       console.log('oops could not add employee', error);
  //     }
  //   );
  // }

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

  // public put(item: Employee) {
  //   this.dataService.put(item).subscribe(
  //     employee => {
  //       this.search();
  //     },
  //     error => {
  //       console.log('oops could not update employee', error);
  //     }
  //   );
  // }

  public put(item: Employee) {
    //const employee: Employee = item;
    this.store.dispatch(EmployeeActions.PUT({payload: item}));
    this.Title = '';
    this.IsCompleted = false;

  }

  public delete(employee: Employee) {
    // this.dataService.delete(employee.id).subscribe(
    //   data => {
    //     console.log('employee deleted');
    //     this.search();
    //   },
    //   error => {
    //     console.log('oops could not delete employee', error);
    //   }
    // );

   this.store.dispatch(EmployeeActions.DELETE({id:employee.id}))
  }

  get() {
  //   this.dataService.getById(this.findEmployee.id).subscribe(
  //     e => {
  //       if (e == null) {
  //         const employeeFind = new Employee();
  //         employeeFind.id = this.findEmployee.id;
  //         this.findEmployee = employeeFind;
  //       } else if (e !== undefined) {
  //         this.EmployeeList=[];
  //         this.EmployeeList.push(e);
  //       }
  //     },
  //     error => {
  //       this.findEmployee = new Employee();
  //       console.log('could not get Employee', error);
  //     }
  //  );

 this.store.dispatch(EmployeeActions.FIND_ID({id:this.findEmployee.id}))
  //this.findEmployee=this.store.select();
  }
}
