import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactsListComponent {
  contacts$: Observable<Contact[]>;
  selectedContact$: Observable<Contact | null>;
  displayedColumns = ['firstName', 'lastName'];

  constructor(private store: Store<{ contacts: ContactsState }>) {
    this.selectedContact$ = this.store.pipe(select(selectSelectedContact));
    this.contacts$ = this.store.pipe(select(selectContacts));
  }

  onSelectContact(contact: Contact) {
    this.store.dispatch(selectContact({ contactId: contact.id }));
  }
}
