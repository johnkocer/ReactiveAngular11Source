import { Component, OnInit } from "@angular/core";
import { Employee } from "../models/employee";
import { EmployeeService } from "../services/employee.service";

@Component({
  selector: "app-employee",
  templateUrl: "./employee.component.html",
  styleUrls: ["./employee.component.css"],
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
    this.findEmployee.name = "";
  }

  ngOnInit() {
    this.search();
  }

  async employeeSeach() {
    if (!this.findEmployee.name.trim()) {
      return;
    }

    try {
      this.EmployeeList = await this._dataService.filter(
        this.findEmployee.name
      );
    } catch (error) {
      console.log("SERVER ERROR: Could not get Employees", error);
      this.EmployeeList = null;
    }
  }

  async search() {
    try {
      this.EmployeeList = await this._dataService.reads();
    } catch (error) {
      console.log("SERVER ERROR: Could not get Employees", error);
      this.EmployeeList = null;
    }
  }

  public async add(item: Employee) {
    try {
      let data = await this._dataService.create(this.newEmployee);
      this.EmployeeList.push(data);
    } catch (error) {
      console.log("SERVER ERROR: Could not get Employees", error);
    }
  }

  public async update(item: Employee) {
    try {
      let data = await this._dataService.update(item);
      this.search();
    } catch (error) {
      console.log("SERVER ERROR: Could not get Employees", error);
    }
  }

  public async delete(employee: Employee) {
    try {
      this._dataService.delete(employee.id);
      console.log("employee deleted");
      this.search();
    } catch (error) {
      console.log("SERVER ERROR: Could not delete employee", error);
    }
  }

  async get() {
    try {
      let data = await this._dataService.read(this.findEmployee.id);
      this.findEmployee = data;
      this.EmployeeList = [];
      this.EmployeeList.push(data);
    } catch (error) {
      console.log("SERVER ERROR: Could not GET employee", error);
    }
  }
}
