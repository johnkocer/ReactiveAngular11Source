module.exports = function () {
  var data = {
    member :[
      { id: 1, fullName: 'Jen Rich', zipCode: '84223', errorMessage: "OK", isSuccess: true },
      { id: 2, fullName: 'John Smart', zipCode: '89223', errorMessage: "OK", isSuccess: true }
    ],

    product :[
      { id: 100, price: 100, name: 'Reqular Montly' },
      { id: 101, price: 150, name: 'Silver Montly' },
      { id: 103, price: 150, name: 'Gold Montly' }
    ],
    employee: [
      { id: 1, name: 'Ms. Nice', gender: 'Male', salary: 10000, departmentId: 1 },
      { id: 2, name: 'Mr. Nice', gender: 'Female', salary: 5000, departmentId: 1 },
      { id: 3, name: 'Narco', gender: 'Male', salary: 8000, departmentId: 1 },
      { id: 4, name: 'Bombasto', gender: 'Male', salary: 9000, departmentId: 1 },
      { id: 5, name: 'Celeritas', gender: 'Male', salary: 10000, departmentId: 1 }
    ]
  }
  return data
}
