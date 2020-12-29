import Employee from './employee.model';

// DB - State
export default interface IDb {
  [x: string]: any;
  EmployeeList: Array<Employee>;
  EmployeeError: Error;
}

export const _defaultDbData = (): IDb => {
  return { EmployeeList: Array<Employee>(), EmployeeError: null };
};
