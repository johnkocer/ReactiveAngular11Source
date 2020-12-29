import { observable, action, computed } from 'mobx-angular';

class ContactStore {
    @observable contacts = [];
    @action setContacts(contacts) {
        this.contacts = contacts;
    }

    @computed get contactList() {
      return this.contacts
    }
}

export const contactStore = new ContactStore();
