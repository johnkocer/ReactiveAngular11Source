import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { IDb } from "./store/state";
import { INC, DEC, RESET } from "./store/actions";

@Component({
  selector: "app-root",
  template: `
    <div style="margin-top: 25px;">
      <h2>Counter Angular Sample: Redux, RxJs and Ngrx Store !</h2>
      <hr />
      <button class="green" (click)="increment()">Increment +</button>
      <button class="red" (click)="decrement()">Decrement -</button>
      <button class="blue" (click)="reset()">RESET = 0</button>
      <h3>The Auther in Parent: {{ (state$ | async)?.author.name }}</h3>
      <h3>The counter in Parent: {{ (state$ | async)?.count }}</h3>
    </div>
    <hr />
    <app-child></app-child>
    <hr>
    <app-sibling></app-sibling>
    <hr>
    <h3 class="line text-decoration-undeline " style="text-align:center">
      Copyright © 2021 -
      <a href="https://t.co/hnIdiJyf6m?amp=1" target="_blank"
        >[ Books by John Kocer @amazon.com]
      </a>
      <br />
      <a href="https://johnkocer.github.io/" target="_blank"
        >https://johnkocer.github.io/</a
      >
    </h3>

  `,
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
