import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import {
  Contact,
  ContactsState,
  selectContact,
  selectContacts,
  selectSelectedContact,
} from 'src/store';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.scss'],
})
export class ContactsListComponent {
  contactsList: Contact[] = [];
  selectedContact$: Observable<Contact | null> = of(null);
  displayedColumns = ['firstName', 'lastName'];

  constructor(private store: Store<{ contacts: ContactsState }>) {}

  ngOnInit() {
    this.selectedContact$ = this.store.pipe(select(selectSelectedContact));
    this.store.pipe(select(selectContacts)).subscribe((contacts) => {
      this.contactsList = contacts;
    });
  }

  onSelectContact(contact: any) {
    if (contact) {
      this.store.dispatch(selectContact({ contactId: contact.id }));
    }
  }
}
