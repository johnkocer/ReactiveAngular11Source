import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import { AppComponent } from './app.component';

import {StoreModule} from '@ngrx/store';
import { ChildComponent } from './child/child.component';
import {SiblingComponent} from './sibling/sibling.component';
import { filterData } from './store/reducer';

@NgModule({
    declarations: [
        AppComponent,
        ChildComponent,
        SiblingComponent
    ],
    imports: [
        BrowserModule,
        StoreModule.forRoot({db: filterData})
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
