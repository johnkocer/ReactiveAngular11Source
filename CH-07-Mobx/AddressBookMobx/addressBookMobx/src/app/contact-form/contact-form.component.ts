import { Component, OnInit, Input, Output, SimpleChanges } from '@angular/core';
import { COUNTRIES } from '../exports';
import { contactStore } from '../store/contact-store';
import { EventEmitter } from '@angular/core';
import { ContactsService } from '../services/contacts.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {
  contactData: any = <any>{};
  countries = COUNTRIES;
  store = contactStore;
  @Input('edit') edit: boolean;
  @Input('contact') contact: any = <any>{};
  @Output('contactEdited') contactEdited = new EventEmitter();

  constructor(
    private contactsService: ContactsService
  ) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.contact) {
      this.contactData = Object.assign({}, this.contact);
    }
  }

  getPostalCodeRegex() {
    if (this.contactData.country == "United States") {
      return /^[0-9]{5}(?:-[0-9]{4})?$/;
    } else if (this.contactData.country == "Canada") {
      return /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
    }
    return /./;
  }

  getPhoneRegex() {
    if (["United States", "Canada"].includes(this.contactData.country)) {
      return /^[2-9]\d{2}[2-9]\d{2}\d{4}$/;
    }
    return /./;
  }

  saveContact(contactForm: NgForm) {
    if (contactForm.invalid) {
      return;
    }

    if (this.edit) {
      this.contactsService.editContact(this.contactData)
        .subscribe(res => {
          this.getContacts();
        })
    }
    else {
      this.contactsService.addContact(this.contactData)
        .subscribe(res => {
          this.getContacts();
        })
    }
  }

  getContacts() {
    this.contactsService.getContacts()
      .subscribe(res => {
        this.store.setContacts(res);
        this.contactEdited.emit();
      })
  }

}
