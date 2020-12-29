import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import Employee from "../employee.model";

import { EmployeeService } from "./employee.service";

@Injectable({ providedIn: "root" })
export class EmployeesStoreService {
  constructor(private employeeService: EmployeeService) {
    this.fetchAll();
  }

  // - We set the initial state in BehaviorSubject's constructor
  // - Nobody outside the Store should have access to the BehaviorSubject
  //   because it has the write rights
  // - Writing to state should be handled by specialized Store methods (ex: addEmployee, removeEmployee, etc)
  // - Create one BehaviorSubject per store entity, for example if you have EmployeeGroups
  //   create a new BehaviorSubject for it, as well as the observable$, and getters/setters
  private readonly _list = new BehaviorSubject<Employee[]>([]);

  // Expose the observable$ part of the _employees subject (read only stream)
  readonly list$ = this._list.asObservable();

  // we'll compose the employees$ observable with map operator to create a stream of only completed employees
  // readonly completedEmployees$ = this.employees$.pipe(
  //   map(employees => employees.filter(employee => employee.isCompleted))
  // )
  // readonly all$ = this.employees$.pipe(
  //   map(employees => employees.filter(employee => employee.isCompleted))
  // )

  // readonly uncompletedEmployees$ = this.employees$.pipe(
  //   map(employees => employees.filter(employee => !employee.isCompleted))
  // )

  // the getter will return the last value emitted in _employees subject
  get employees(): Employee[] {
    return this._list.getValue();
  }

  // assigning a value to this.employees will push it onto the observable
  // and down to all of its subsribers (ex: this.employees = [])
  set employees(val: Employee[]) {
    this._list.next(val);
  }

  async post(item: Employee) {
    try {
      const employee = await this.employeeService.post(item).toPromise();

      // we swap the local tmp record with the record from the server (id must be updated)
      // const index = this.employees.indexOf(this.employees.find(t => t.id === tmpId));
      // this.employees[index] = {
      //   ...employee
      // }
      // this.employees = [...this.employees];
      this.employees = [...this.employees, employee];
    } catch (e) {
      // is server sends back an error, we revert the changes
      console.error(e);
      //this.removeEmployee(tmpId, false);
    }

    //}
  }
  async put(item: Employee) {
    try {
      const employee = await this.employeeService.put(item).toPromise();

      const index = this.employees.indexOf(
        this.employees.find((t) => t.id === item.id)
      );
      this.employees[index] = {
        ...employee,
      };
      this.employees = [...this.employees];
      //this.employees = [ ...this.employees, employee ];

      //this.employees = [ ...this.employees, employee ];
    } catch (e) {
      console.error(e);
    }
  }

  async delete(id: number) {
    // optimistic update
    // const employee = this.employees.find((t) => t.id === id);
    this.employees = this.employees.filter((employee) => employee.id !== id);

    try {
      await this.employeeService.delete(id).toPromise();
      this.employees = this.employees.filter((employee) => employee.id !== id);
    } catch (e) {
      console.error(e);
      //this.employees = [...this.employees, employee];
    }
  }

  async fetchAll() {
    this.employees = await this.employeeService.index().toPromise();
  }

  async getById(id:number) {
   const findEmployee = await this.employeeService.getById(id).toPromise();
    this.employees =[findEmployee];
  }

  async search(text:string) {
    const findEmployees = await this.employeeService.search(text).toPromise();
     this.employees =findEmployees;
   }
}
