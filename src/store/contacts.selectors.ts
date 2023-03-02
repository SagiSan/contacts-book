import { createSelector } from '@ngrx/store';
import { ContactsState } from '../store';

const getContacts = ({ contacts }: { contacts: ContactsState }) => contacts;

export const selectContacts = createSelector(
  getContacts,
  (contacts) => contacts.contacts
);

export const selectSelectedContact = createSelector(
  getContacts,
  (contacts) => contacts.selectedContact
);
