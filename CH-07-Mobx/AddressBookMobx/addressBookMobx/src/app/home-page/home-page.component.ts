import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ContactsService } from '../services/contacts.service';
import { contactStore } from '../store/contact-store';
import { Clog } from '../shared';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  modalRef: BsModalRef;
  store = contactStore;
  edit: boolean;
  contacts: any[] = [];
  selectedContact: any = <any>{};
  constructor(
    private modalService: BsModalService,
    private contactsService: ContactsService
  ) { }

  openModal(addTemplate: TemplateRef<any>) {
    this.modalRef = this.modalService.show(addTemplate);
  }

  openEditModal(editTemplate: TemplateRef<any>, contact) {
    this.selectedContact = contact;
    this.modalRef = this.modalService.show(editTemplate);
  }

  closeModal() {
    this.modalRef.hide();
    this.selectedContact = {};
  }

  async ngOnInit() {
    let res =await this.contactsService.getContacts().toPromise()
      this.store.setContacts(res);
    let mylist= this.store.contactList
    Clog(mylist, "myList")
    console.log("END myList")
  }

  deleteContact(id) {
    this.contactsService.deleteContact(id)
      .subscribe(res => {
        this.getContacts();
      })
  }

  getContacts() {
    this.contactsService.getContacts()
      .subscribe(res => {
        this.store.setContacts(res);
      })
  }
}
