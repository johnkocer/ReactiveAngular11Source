import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular Service Layers: Redux, RxJs and Ngrx Store ';
  _year:string
  constructor(){
    this._year= new Date().toISOString().slice(0, 4)

  }
}
