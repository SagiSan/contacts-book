export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
}
export interface ContactsState {
  contacts: Contact[];
  selectedContact: Contact | null;
}
