import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { addContact, Contact, ContactsState, selectContacts } from 'src/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Contacts Book';
  contacts$: Observable<Contact[]>;

  constructor(
    public dialog: MatDialog,
    private store: Store<{ contacts: ContactsState }>
  ) {
    this.contacts$ = this.store.pipe(select(selectContacts));
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ContactFormComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const newContact: Contact = result;
        this.store.dispatch(addContact({ contact: newContact }));
      }
    });
  }
}
