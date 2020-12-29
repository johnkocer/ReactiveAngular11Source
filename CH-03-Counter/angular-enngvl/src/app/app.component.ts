import { Component} from "@angular/core";
import { Observable } from "rxjs";
import { Store, createAction, createReducer, on, Action } from "@ngrx/store";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  state$: Observable<IDb>;

  constructor(private store: Store<{ db: IDb }>) {
    this.state$ = this.store.select("db");
  }

  increment() {
    this.store.dispatch(INC());
  }

  decrement() {
    this.store.dispatch(DEC());
  }

  reset() {
    this.store.dispatch(RESET());
  }
}

// functions - actions
export const INC = createAction("[Counter Component] Increment");
export const DEC = createAction("[Counter Component] Decrement");
export const RESET = createAction("[Counter Component] Reset");

// DB - State
export interface IDb {
  count: number;
  author: {
    name: string;
  };
}
export const _defaultDbData = (): IDb => {
  return { count: 0, author: { name: "John Kocer" } };
};

export const defaultData = _defaultDbData();

// Filtered Data - Reducer, slicers
const _filterDbData = createReducer(
  defaultData,
  on(INC, (state) => ({
    count: state.count + 1,
    author: { name: state.author.name },
  })),
  on(DEC, (state) => ({
    count: state.count - 1,
    author: { name: state.author.name },
  })),
  on(RESET, (state) => ({ count: 0, author: { name: state.author.name } }))
);

export function filterData(state: IDb | undefined, action: Action) {
  return _filterDbData(state, action);
}
