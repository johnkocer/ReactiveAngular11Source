import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Store, select } from "@ngrx/store";
import { INCREMENT, DECREMENT,RESET } from "./store/actions";
import {AppState} from './store/state';
import {getCount} from './store/selector'
import { createSelector, createFeatureSelector} from '@ngrx/store';

@Component({
  selector: "app-root",
  template: `
    <div style="background-color:rgb(10, 100, 200);">
      <button (click)="increment()"> Increment + </button>
      <button (click)="decrement()"> Decrement - </button>
      <button (click)="reset()"> RESET = 0 </button>
      <p>The counter in Parent: {{ count$ |async  }}</p>
      <app-child></app-child>
      <app-sibling></app-sibling>

    </div>
  `,
})
export class AppComponent {
  count$: Observable<number>;
  todoData$: Observable<any>;

  constructor(private store: Store<AppState>) {
    this.count$ = this.store.select("count");
    // this.todoData$ = store.select('todo');
  }

  // ngOnInit() {
  //   this.count$=this.store.select('counterState')
  // }
    increment() {
    this.store.dispatch(INCREMENT());
    console.log("🚀 ~ file: app.component.ts ~ line 27 ~ AppComponent ~ constructor ~ this.counter$", this.count$)

  }

  decrement() {
    this.store.dispatch(DECREMENT());
  }

  reset() {
    this.store.dispatch(RESET());
  }
}


export const selectTodo = createFeatureSelector<IStore, TodoState>('todo');
interface IStore {
  count: number,
  todo: {
    data : number
  }
}

interface TodoState  {
  data : number
}
const selectTododata = createSelector(
  selectTodo,
  (state: TodoState) => state.data
);
