// ***********************************************************************************************
// Copyright (c) 2021 SmartIT Consultation
/* John Kocer
Author/ IT Consultant / Sr. Technical Lead / Architect
smartit.consultation@gmail.com
Twitter :  https://twitter.com/jkocer
Amazon: https://www.amazon.com/s/ref=nb_sb_noss_2?url=search-alias%3Daps&field-keywords=john+kocer
LinkedIn: https://www.linkedin.com/in/john-kocer-117a7662/
http://www.c-sharpcorner.com/members/john2098
https://johnkocer.github.io/
*/
// ***********************************************************************************************

using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SmartIT.DebugHelper;
using SmartIT.Employee.MockDB;

namespace EmployeeWebApi.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class EmployeesController : ControllerBase
  {
    private readonly EmployeeRepository _employeeService;

    public EmployeesController()
    {
      _employeeService = new EmployeeRepository();
    }

    [HttpGet]
    public async Task<ICollection<Employee>> Get()
    {
      var ret = await _employeeService.GetAllAsync();
      DebugDump.CLog("[Employees - GET ALL] " + ret.Count);
      ret.DDump("http://localhost:5000/api/employees [Employees - GET ALL] ");
      ret.CDump("http://localhost:5000/api/employees [Employees - GET ALL] ");

      //console.table(resData.slice(0, 5));

      return ret;
      ;
    }

    [HttpGet("{id}")]
    public Employee Get(int id)
    {
      var ret = _employeeService.FindbyId(id);
     // DebugDump.CLog("[Employees - GET ALL] " + ret.Count);
      ret.DDump("http://localhost:5000/api/employees - [Employees - GET  ] Item: ");
      ret.CDump("http://localhost:5000/api/employees - [Employees - GET  ] Item: ");
      return ret;
    }

    [HttpPost]
    public async Task<Employee> AddEmployee([FromBody] Employee item)
    {
      var ret = await _employeeService.AddAsync(item);
      ret.DDump("http://localhost:5000/api/employees - [Employees - POST] Item: ");
      ret.CDump("http://localhost:5000/api/employees - [Employees - POST] Item: ");
      return ret;
    }

    [HttpPut("{id}")]
    public async Task<Employee> UpdateEmployee([FromBody] Employee item)
    {
      var ret= await _employeeService.UpdateAsync(item);
      ret.DDump("http://localhost:5000/api/employees - [Employees - PUT] Item: ");
      ret.CDump("http://localhost:5000/api/employees - [Employees - PUT] Item: ");
      return ret;
    }

    [Route("~/api/employees/byName/{name}")]
    [HttpGet]
    public ICollection<Employee> GetEmployeeByName(string name)
    {
      var ret= _employeeService.FindbyName(name);
      ret.DDump($"http://localhost:5000/api/employees - [Employees - GET  ] Search name: {name} - Record found: {ret.Count}  ");
      ret.CDump($"http://localhost:5000/api/employees - [Employees - GET  ] Search name: {name} - Record found: {ret.Count}  ");
      return ret;
    }

    [HttpDelete("{id}")]
    public async Task Delete(int id)
    {
      var findEmployee = _employeeService.FindbyId(id);
      if (findEmployee != null)
        await _employeeService.DeleteAsync(findEmployee);

      DebugDump.DLog("http://localhost:5000/api/employees - [Employees - DELETE] Item: ");
      DebugDump.CLog("http://localhost:5000/api/employees - [Employees - DELETE] Item: ");
    }
  }
}