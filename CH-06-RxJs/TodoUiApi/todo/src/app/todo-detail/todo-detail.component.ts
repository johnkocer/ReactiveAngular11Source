import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Todo } from "../models/todo";

@Component({
  selector: "app-todo-detail",
  templateUrl: "./todo-detail.component.html",
  styleUrls: ["./todo-detail.component.css"],
})
export class TodoDetailComponent implements OnInit {
  @Input() todo: Todo;
  @Output() updateItemEvent = new EventEmitter<any>();
  constructor() {}

  ngOnInit(): void {}
  // mupdate(){
  //   console.log("🚀 ~ file: todo-detail.component.ts ~ line 18 ~ TodoDetailComponent ~ mupdate ~ this.todo", this.todo)

  //   this.outputFromChild.emit(this.todo)
  // }

  updateItem(value: any) {
    console.log(
      "🚀 ~ file: todo-detail.component.ts ~ line 23 ~ TodoDetailComponent ~ addNewItem ~ value",
      value
    );
    this.updateItemEvent.emit(value);
  }
  isShow(){ return this.todo == undefined}
}
