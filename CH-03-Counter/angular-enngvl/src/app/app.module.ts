import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent, filterData } from './app.component';
import { StoreModule } from '@ngrx/store';
@NgModule({
  imports: [BrowserModule,
    StoreModule.forRoot({db: filterData})
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}


/*
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://github.com/ngrx/platform
*/