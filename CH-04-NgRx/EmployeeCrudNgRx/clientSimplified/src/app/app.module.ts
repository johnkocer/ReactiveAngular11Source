import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { CounterComponent } from './counter/counter.component';
import { EffectsModule } from '@ngrx/effects';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeEffects } from './store/employee.effects';
import { FilterDataContext } from './store/employee.reducer';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { FetchdataService } from './fetchdata.service';
import {FormsModule} from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import {StoreDevtoolsModule} from '@ngrx/store-devtools'
import { StoreModule } from '@ngrx/store';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    EmployeeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    StoreModule.forRoot({ db: FilterDataContext }),
    EffectsModule.forRoot([EmployeeEffects]),
    StoreDevtoolsModule.instrument()

  ],
  providers: [
    { provide: "BASE_URL", useFactory: getBaseUrl },
    FetchdataService,
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }

export function getBaseUrl() {
  return document.getElementsByTagName("base")[0].href;
}
