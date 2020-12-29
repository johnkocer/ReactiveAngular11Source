import { Component } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { INC } from "../store/actions";
import {IDb} from '../store/state';

@Component({
  selector: "app-sibling",
  template: `
    <div style="background-color:rgb(80, 200, 71);">
      <h3>Sibling component</h3>
      <h3>The counter in Sibling is {{ (childCounter$ | async)?.count }}</h3>
    </div>
  `,
  styles: [],
})
export class SiblingComponent {
  childCounter$: Observable<IDb>;

  constructor() {
  }
}
