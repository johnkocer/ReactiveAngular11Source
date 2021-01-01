const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
var cors = require('cors')

const app = express();

const port = process.env.PORT || 5000;
const employees = require('./employeesDb');
app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.get('/api/employees', (req, res) =>{

  let resData = Object.values(employees)
  console.log("[Employees - GET ALL]", resData.length)

  console.table(resData.slice(0,5));
  // console.log(JSON.stringify(resData.slice(0,5)));
   return res.json(employees);
});

app.post('/api/employees', (req, res) => {
  const id = uuidv4();
  const employee = {
    id,
    name: req.body.name,
    gender: req.body.gender,
    salary: req.body.salary
  };
 
  employees.push(employee);
  console.log("[Employees - POST]",  employee)
  res.status(200).json(employee);
  //return res.send(employee);
});

app.get('/api/employees/:id', (req, res) => {
  let id = req.params.id;
  for (let item of employees) {
    if (item.id === id) {
       console.log("[Employees - GET  ] Item: ", item)

       res.status(200).json(item);

        return;
    }
  }
  console.log("[Employees - GET Not found ] Item: ", item)
  res.status(200).json(item);
});

app.get('/api/employees/byName/:name', (req, res) => {

  let name = req.params.name;
  //let resData = Object.values(employees)
  let list = employees.filter(t=>t.name.toLowerCase().includes(name.toLowerCase()));

  console.log(`[Employees - GET  ] Search name: ${name} - Record Count: ${list.length} `)
  console.table( list.slice(0,5))

  res.status(200).json(list);
});

app.put("/api/employees/:id", (req, res) => {
  const itemId = req.params.id;
  const item = req.body;
  console.log("[Editing item: ]", itemId, " to be ", item);

  //const updatedListItems = [];
  // loop through list to find and replace one item
  employees.forEach((oldItem, index) => {
     if (oldItem.id === itemId) {
        employees[index]=item;
     } 
  });

  // replace old list with new one
  //employees = updatedListItems;
  console.log("[Employees - PUT]",  item)
  res.json(item);
});

app.delete('/api/employees/:id', (req, res) => {
  employees.forEach((e, index)=>{
    if(e.id === req.params.id)
      employees.splice(index, 1)
  });
  console.log("[Employees - DELETE]", req.params.id)
 
  return res.send(employees);
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});