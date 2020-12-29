import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import Employee from "../employee.model";

import { EmployeeService } from "./employee.service";

@Injectable({ providedIn: "root" })
export class EmployeesStoreService {
  constructor(private employeeService: EmployeeService) {
    this.fetchAll();
  }

  private readonly _list = new BehaviorSubject<Employee[]>([]);

  // Expose the observable$ part of the _employees subject (read only stream)
  readonly list$ = this._list.asObservable();

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

      this.employees = [...this.employees, employee];
    } catch (e) {
      // is server sends back an error, we revert the changes
      console.error(e);
    }
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
    } catch (e) {
      console.error(e);
    }
  }

  async delete(id: number) {
    this.employees = this.employees.filter((employee) => employee.id !== id);

    try {
      await this.employeeService.delete(id).toPromise();
      this.employees = this.employees.filter((employee) => employee.id !== id);
    } catch (e) {
      console.error(e);
    }
  }

  async fetchAll() {
    this.employees = await this.employeeService.index().toPromise();
  }

  async getById(id: number) {
    const findEmployee = await this.employeeService.getById(id).toPromise();
    this.employees = [findEmployee];
  }

  async search(text: string) {
    const findEmployees = await this.employeeService.search(text).toPromise();
    this.employees = findEmployees;
  }
}
