import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/employee';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
list:Employee[]
myChoise : Choise
date:any;
  constructor() {
    this.list=[
      ,{id:1,name:"Ms. Jen", gender:"Female", departmentId:1,salary:5000}
      ,{id:2,name:"Ms. nancy", gender:"Female", departmentId:1,salary:5000}
      ,{id:3,name:"Mr. Mike", gender:"Female", departmentId:1,salary:5000}
  ]
   }

  ngOnInit(): void {
    //this.textSearch()
    //this.array01()
    this.type01()
  }
  type01(){
    this.myChoise = "C"
    console.log("🚀 ~ file: home.component.ts ~ line 25 ~ HomeComponent ~ type01 ~ Choise", this.myChoise)
  }
  array01(){
//Technically, you could still create a new class instance every time you draft up the next state with
// Object.assign() like this:
// Object.assign(new IssueState(), lastState);
// Set on the other hand is not identical to a plain array list
// since sets won’t accept duplicate entries. If duplicates aren’t preventable in other ways, you can still
// work with Set but convert back to array before placing it in the state:
    const list = [1, 1, 2, 3, 3, 4];
    const uniqueList = Array.from(new Set(list)); // [1, 2, 3, 4]
    console.log("🚀 ~ file: home.component.ts ~ line 25 ~ HomeComponent ~ array01 ~ uniqueList", uniqueList)

   const  list01=[
      ,{id:1,name:"Ms. Jen", gender:"Female", departmentId:1,salary:5000}
      ,{id:2,name:"Ms. nancy", gender:"Female", departmentId:1,salary:5000}
      ,{id:3,name:"Mr. Mike", gender:"Female", departmentId:1,salary:5000}
      ,{id:3,name:"Mr. Mike", gender:"Female", departmentId:1,salary:5000}
  ]

  const uniqueList01=Array.from(new Set(list01))
  console.log("🚀 ~ file: home.component.ts ~ line 41 ~ HomeComponent ~ array01 ~ uniqueList01", uniqueList01)
  console.table(uniqueList01)
  }
  textSearch(){
    console.log("🚀 ~ file: home.component.ts ~ line 23 ~ HomeComponent ~ textSearch ~ this.list", this.list)
    let searchText = 'ms'//'jen'

    let result1=this.list.filter(t=>t.name.toLowerCase().includes(searchText.toLowerCase()))
    console.log("🚀 ~ file: home.component.ts ~ line 25 ~ HomeComponent ~ textSearch ~ result1", result1)
    console.table(result1)

     let filteredList= this.list.filter(t=> t.name.match(new RegExp("[^,]*"+searchText+"[^,]*",'ig')));
      console.log("filteredList", filteredList)
      console.table(filteredList)

  }
  textSearch1(){
    var userInput = 'Development thetesting devs Dev testING test testIng',
    result = userInput.match(/\b(testing|dev)\b/i);
    console.log("🚀 ~ file: home.component.ts ~ line 43 ~ HomeComponent ~ textSearch1 ~ result", result)

console.log(result && result[0]);
console.table(result);
    //let searchText = req.params.name;
    // let s =`/\b?${searchText}\b?`;x
    // console.log("🚀 ~ file: index.js ~ line 42 ~ router.get ~ s", s)
    //   const regex = new RegExp(s, 'g');
    //   console.log("🚀 ~ file: index.js ~ line 43 ~ router.get ~ regex", regex)
    //   console.log("🚀 ~ file: index.js ~ line 40 ~ router.get ~ req.params", req.params)
    //   // let list = db.get('employees').filter(s => s.name.includes(searchText)).value();

    //   const list = db.get('employees').value();
    //   console.log("🚀 ~ file: index.js ~ line 48 ~ router.get ~ list", list)
    //   let filteredList= list.filter((t) => {
    //       return t.name.match(regex);
    //     });
    //   console.log("🚀 ~ file: index.js ~ line 51 ~ filteredList ~ filteredList", filteredList)
  }
}

export type Choise = "A" | "B" | "C";

// export class Employee {
//   public id: number;
//   public name: string;
//   public gender: string;
//   public departmentId: number;
//   public salary: number;
// }
//let myList =[ 10, “John”, true]

// @Component({
//   selector: 'async-observable-pipe',
//   template: '<div><code>observable|async</code>: Time: {{ time | async }}</div>'
// })
// export class AsyncObservablePipeComponent {
//   time = new Observable<string>((observer: Observer<string>) => {
//     setInterval(() => observer.next(new Date().toString()), 1000);
//   });
// }

