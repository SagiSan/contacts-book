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
  contacts$: Observable<Contact[]> = of([]);
  contactsList: Contact[] = [];
  selectedContact$: Observable<Contact | null> = of(null);
  selectedID = '';
  displayedColumns = ['firstName', 'lastName'];

  constructor(private store: Store<{ contacts: ContactsState }>) {}

  ngOnInit() {
    this.contacts$ = this.store.pipe(select(selectContacts));
    this.selectedContact$ = this.store.pipe(select(selectSelectedContact));
    this.contacts$.subscribe((contacts) => {
      this.contactsList = contacts;
    });
    this.selectedContact$.subscribe((selectedContact) => {
      if (selectedContact) {
        this.selectedID = selectedContact.id;
      }
    });
  }

  onSelectContact(contact: any) {
    if (contact) {
      this.store.dispatch(selectContact({ contactId: contact.id }));
    }
  }
}
