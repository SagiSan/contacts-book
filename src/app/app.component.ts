import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { Store } from '@ngrx/store';
import { addContact, Contact } from 'src/store';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Contacts Book';

  constructor(public dialog: MatDialog, private store: Store) {}

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
