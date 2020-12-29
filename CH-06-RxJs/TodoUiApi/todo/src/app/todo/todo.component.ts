import { Component, OnInit } from '@angular/core';
import { Todo } from '../models/todo';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  public TodoList: Todo[];

  selectedTodo: Todo;
  todoFromChild:Todo

  constructor(private _dataService: TodoService) { }

  updateItem(event) {
    this.todoFromChild=event
    console.log("🚀 ~ file: todo.component.ts ~ line 22 ~ TodoComponent ~ event", event)
    this.update(this.todoFromChild)
  }
  onSelect(todo: Todo): void {
    this.selectedTodo = todo;
  }

ngOnInit() {
  this.search();
}

search() {
  this._dataService.reads().subscribe(
    (data: Todo[]) => {
      this.TodoList = data;
    },
    error => {
      console.log('could not get Todos', error);
      this.TodoList = null;
    }
  );
}

public add(name: string) {
  this._dataService.create({id:0,name:name}).subscribe(
    (data: Todo) => {
      this.TodoList.push(data);
    },
    error => {
      console.log('oops could not add todo', error);
    }
  );
}

public update(item: Todo) {
  console.log("🚀 ~ file: todo.component.ts ~ line 62 ~ update ~ item", item)
  this._dataService.update(item).subscribe(
    todo => {
      this.search();
    },
    error => {
      console.log('oops could not update todo', error);
    }
  );
}

public delete(todo: Todo) {
  this._dataService.delete(todo.id).subscribe(
    data => {
      console.log('todo deleted');
      this.search();
    },
    error => {
      console.log('oops could not delete todo', error);
    }
  );
}
}
