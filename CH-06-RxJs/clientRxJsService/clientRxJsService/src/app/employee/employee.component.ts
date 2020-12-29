import { Component } from "@angular/core";

import Employee from "../employee.model";
import { EmployeesStoreService } from "../services/employee-store.service";

@Component({
  selector: "app-employee",
  templateUrl: "./employee.component.html",
  styleUrls: ["./employee.component.css"],
})
export class EmployeeComponent {
  showEditor = true;
  myName: string;
  newEmployee: Employee;
  findEmployee: Employee;

  Title: string = "";
  IsCompleted: boolean = false;

  employeeError: Error = null;
  constructor(public dataService: EmployeesStoreService) {
    this.newEmployee = new Employee();
    this.findEmployee = new Employee();
    this.findEmployee.name = "";
  }

  // ngOnInit() {
  // }

  employeeSeach() {
    this.dataService.search(this.findEmployee.name);
  }

  public post(item: Employee) {
    this.dataService.post(item);
  }

  public put(item: Employee) {
    this.dataService.put(item);
  }

  public delete(employee: Employee) {
    this.dataService.delete(employee.id);
  }

  get() {
    this.dataService.getById(this.findEmployee.id);
  }
}
