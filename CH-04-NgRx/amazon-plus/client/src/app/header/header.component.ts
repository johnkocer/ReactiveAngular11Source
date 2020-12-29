import { Component, OnInit, Input } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Product } from '../product/product.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  items: Array<any> = []
  film:any;
  imgSrc: string = "assets/images/image001.jpg";
  imgSrc1: string = "assets/images/image002.jpg";
  imgSrc2: string = "assets/images/image003.jpg";
  imgSrc3: string = "assets/images/image004.jpg";
  wasClicked = false;

  constructor(private store: Store<{ items: []; cart: [] }>) {
    store.pipe(select('shop')).subscribe(data => (this.cart = data.cart));

    this.items = [
      { name: "assets/images/image001.jpg"},
      { name:"assets/images/image002.jpg"},
      { name:"assets/images/image003.jpg"},
      { name:"assets/images/image004.jpg"},
      { name:"assets/images/image005.jpg"},
      { name:"assets/images/image006.jpg"},
      { name:"assets/images/image007.jpg"},
      { name:"assets/images/image008.jpg"},
      { name:"assets/images/image009.jpg"},
      { name:"assets/images/image010.jpg"},
      { name:"assets/images/image011.jpg"},
      { name:"assets/images/image012.jpg"},
    ]
    this.imgSrc=this.items[0].name
    console.log("🚀 ~ file: app.component.ts ~ line 29 ~ AppComponent ~ constructor ~ this.items[0].name", this.items[0].name)


  }

  cart: Product[] = [];

  ngOnInit() {
    this.animate()
  }
  fav(film:string){
    if(this.wasClicked === false){
      this.wasClicked = true;
      // this._filmService.addFavFilms(film);
      this.imgSrc = "../../assets/images/image002.jpg";
    }
    else {
      this.wasClicked = false;
      console.log(this.wasClicked);
      // this._filmService.deleteFav(film.text);
      this.imgSrc = "assets/images/image003.jpg";
    }
  }
  
  animate(){
    this.imgSrc=this.items[Math.floor((Math.random() * 11) + 1)].name;
    this.imgSrc1=this.items[Math.floor((Math.random() * 11) + 1)].name;
    this.imgSrc2=this.items[Math.floor((Math.random() * 11) + 1)].name;
    this.imgSrc3=this.items[Math.floor((Math.random() * 11) + 1)].name;
    // Math.floor((Math.random() * 10) + 1);
  //  setTimeout(this.animate, 9000)
  setTimeout(()=>{                           //<<<---using ()=> syntax
    this.animate();
  }, 3000);
  }
}
