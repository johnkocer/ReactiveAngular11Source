import Employee from './employee.model';

export default class EmployeeState {
  [x: string]: any;
  EmployeeList: Array<Employee>;
  EmployeeError: Error;
}

export const initializeState = (): EmployeeState => {
  return { EmployeeList: Array<Employee>(), EmployeeError: null };
};
