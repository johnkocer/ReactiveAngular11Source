using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
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
            return await _employeeService.GetAllAsync();
        }

        [HttpGet("{id}")]
        public Employee Get(int id)
        {
            return _employeeService.FindbyId(id);
        }

        [HttpPost]
        public async Task<Employee> AddEmployee([FromBody] Employee item)
        {
            return await _employeeService.AddAsync(item);
        }

        [HttpPut("{id}")]
        public async Task<Employee> UpdateEmployee([FromBody] Employee item)
        {
            return await _employeeService.UpdateAsync(item);
        }

        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            var findEmployee = _employeeService.FindbyId(id);
            if (findEmployee != null)
                await _employeeService.DeleteAsync(findEmployee);
        }
    }
}