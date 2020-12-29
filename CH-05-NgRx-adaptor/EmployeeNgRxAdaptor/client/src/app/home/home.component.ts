import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  _year:string
  constructor(){
    this._year= new Date().toISOString().slice(0, 4)
  }

  ngOnInit(): void {
  }

}
