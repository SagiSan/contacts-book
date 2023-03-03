import { createReducer, on } from '@ngrx/store';
import {
  addContact,
  clearSelectedContact,
  selectContact,
} from './contacts.actions';
import { ContactsState } from '../store';

const initialState: ContactsState = {
  contacts: [],
  selectedContact: null,
};

export const contactsReducer = createReducer(
  initialState,
  on(addContact, (state, { contact }) => ({
    ...state,
    contacts: [...state.contacts, contact],
  })),
  on(selectContact, (state, { contactId }) => ({
    ...state,
    selectedContact: state.contacts.find(
      (contact) => contact.id === contactId
    )!,
  })),
  on(clearSelectedContact, (state) => ({
    ...state,
    selectedContact: null,
  }))
);
