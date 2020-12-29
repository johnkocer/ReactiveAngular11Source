import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/employee';
import { EmployeeService } from '../services/employee.service';
// import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  public EmployeeList: Employee[];
  showEditor = true;
  myName: string;
  newEmployee: Employee;
  findEmployee: Employee;

  constructor(private _dataService: EmployeeService) {
    this.newEmployee = new Employee();
    this.findEmployee = new Employee();
    this.findEmployee.name = '';
  }

  ngOnInit() {
    this.search();
  }

  employeeSeach() {
    if (!this.findEmployee.name.trim()) { return; }

    this._dataService.filter(this.findEmployee.name).subscribe(
      (data: Employee[]) => {
        this.EmployeeList = data;
      },
      error => {
        console.log('could not get Employees', error);
        this.EmployeeList = null;
      }
    );
  }

  search() {
    this._dataService.reads().subscribe(
      (data: Employee[]) => {
        this.EmployeeList = data;
      },
      error => {
        console.log('could not get Employees', error);
        this.EmployeeList = null;
      }
    );
  }

  public add(item: Employee) {
    this._dataService.create(this.newEmployee).subscribe(
      (data: Employee) => {
        this.EmployeeList.push(data);
      },
      error => {
        console.log('oops could not add employee', error);
      }
    );
  }

  public update(item: Employee) {
    this._dataService.update(item).subscribe(
      employee => {
        this.search();
      },
      error => {
        console.log('oops could not update employee', error);
      }
    );
  }

  public delete(employee: Employee) {
    this._dataService.delete(employee.id).subscribe(
      data => {
        console.log('employee deleted');
        this.search();
      },
      error => {
        console.log('oops could not delete employee', error);
      }
    );
  }

  get() {
    this._dataService.read(this.findEmployee.id).subscribe(
      e => {
        if (e == null) {
          const employeeFind = new Employee();
          employeeFind.id = this.findEmployee.id;
          this.findEmployee = employeeFind;
        } else if (e !== undefined) {
          this.findEmployee = e;
        }
      },
      error => {
        this.findEmployee = new Employee();
        console.log('could not get Employee', error);
      }
    );
  }
}

// export class Employee {
//   public id: number;
//   public name: string;
//   public gender: string;
//   public departmentId: number;
//   public salary: number;
// }
