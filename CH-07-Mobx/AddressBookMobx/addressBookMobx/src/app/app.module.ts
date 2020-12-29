import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CustomFormsModule } from 'ng2-validation'
import { MobxAngularModule } from 'mobx-angular';
import { ContactsService } from './services/contacts.service';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ContactFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CustomFormsModule,
    ModalModule.forRoot(),
    MobxAngularModule
  ],
  providers: [
    ContactsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
