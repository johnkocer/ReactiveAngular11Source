import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { GetItems } from '../store/actions';
import { Product } from '../product/product.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  bookItems: Array<any> = [];
  film: any;
  imgSrc: string = 'assets/images/image001.jpg';
  imgSrc1: string = 'assets/images/image002.jpg';
  imgSrc2: string = 'assets/images/image003.jpg';
  imgSrc3: string = 'assets/images/image004.jpg';
  wasClicked = false;

  constructor(private store: Store<{ items: Product[]; cart: [] }>) {
    store.pipe(select('shop')).subscribe(data => (this.items = data.items));

    this.bookItems = [
      { name: 'assets/images/image001.jpg' },
      { name: 'assets/images/image002.jpg' },
      { name: 'assets/images/image003.jpg' },
      { name: 'assets/images/image004.jpg' },
      { name: 'assets/images/image005.jpg' },
      { name: 'assets/images/image006.jpg' },
      { name: 'assets/images/image007.jpg' },
      { name: 'assets/images/image008.jpg' },
      { name: 'assets/images/image009.jpg' },
      { name: 'assets/images/image010.jpg' },
      { name: 'assets/images/image011.jpg' },
      { name: 'assets/images/image012.jpg' }
    ];
    this.imgSrc = this.bookItems[0].name;
    console.log(
      '🚀 ~ file: app.component.ts ~ line 29 ~ AppComponent ~ constructor ~ this.items[0].name',
      this.bookItems[0].name
    );
  }

  items: Product[] = [];

  ngOnInit() {
    this.store.dispatch(new GetItems());
    this.animate();
  }

  cart: Product[] = [];

  // fav(film: string) {
  //   if (this.wasClicked === false) {
  //     this.wasClicked = true;
  //     this.imgSrc = '../../assets/images/image002.jpg';
  //   } else {
  //     this.wasClicked = false;
  //     console.log(this.wasClicked);
  //     this.imgSrc = 'assets/images/image003.jpg';
  //   }
  // }

  animate() {
    this.imgSrc = this.bookItems[Math.floor(Math.random() * 11 + 1)].name;
    this.imgSrc1 = this.bookItems[Math.floor(Math.random() * 11 + 1)].name;
    this.imgSrc2 = this.bookItems[Math.floor(Math.random() * 11 + 1)].name;
    this.imgSrc3 = this.bookItems[Math.floor(Math.random() * 11 + 1)].name;
    setTimeout(() => {
      this.animate();
    }, 3000);
  }
}
