import Employee from "../models/employee.model";
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";

export interface EmployeeState extends EntityState<Employee> {
  // [x: string]: any;
  // EmployeeList: Array<Employee>;
  //selectedEmployeeId: null;
  EmployeeError: Error;
}

export const adapter: EntityAdapter<Employee> = createEntityAdapter<Employee>();
