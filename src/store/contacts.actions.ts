import { createAction, props } from '@ngrx/store';
import { Contact } from '../store';

export const addContact = createAction(
  '[Contacts] Add Contact',
  props<{ contact: Contact }>()
);
export const selectContact = createAction(
  '[Contacts] Select Contact',
  props<{ contactId: string }>()
);
