import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { addContact, Contact, ContactsState, selectContacts } from 'src/store';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Contacts Book';
  contacts$: Observable<Contact[]> = of([]);

  constructor(
    public dialog: MatDialog,
    private store: Store<{ contacts: ContactsState }>
  ) {}

  ngOnInit(): void {
    this.contacts$ = this.store.pipe(select(selectContacts));
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ContactFormComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const newContact: Contact = { ...result, id: uuid() };
        this.store.dispatch(addContact({ contact: newContact }));
      }
    });
  }
}
