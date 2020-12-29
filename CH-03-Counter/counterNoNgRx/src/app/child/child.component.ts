import { Component } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { INC } from "../store/actions";
import { IDb } from "../store/state";

@Component({
  selector: "app-child",
  template: `
    <div style="background-color:rgb(255, 99, 71);">
      <h3>Child component</h3>
      <h3>The counter in child is {{ (childCounter$ | async)?.count }}</h3>
    </div>
  `,
  styles: [],
})
export class ChildComponent {
  childCounter$: Observable<IDb>;

  constructor() {
   // this.childCounter$ = store.select("db");

    //setTimeout(() => this.store.dispatch(INC()), 10000);
  }
}

// export class ChildComponent {
//   childCounter$: Observable<IDb>;

//   constructor(private store: Store<{db:IDb}>) {
//    // this.childCounter$ = store.select("db");

//     //setTimeout(() => this.store.dispatch(INC()), 10000);
//   }
// }
