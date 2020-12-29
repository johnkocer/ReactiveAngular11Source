import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { TodoComponent } from "./todo/todo.component";
import { TodoDetailComponent } from "./todo-detail/todo-detail.component";
import { TodoService } from "./services/todo.service";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [AppComponent, TodoComponent, TodoDetailComponent],
  imports: [BrowserModule, FormsModule, AppRoutingModule, HttpClientModule],
  providers: [TodoService],
  bootstrap: [AppComponent],
})
export class AppModule {}
