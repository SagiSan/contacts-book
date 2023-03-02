import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
})
export class ContactFormComponent {
  firstName = '';
  lastName = '';
  phone = '';
  email = '';
  address = '';

  constructor(public dialogRef: MatDialogRef<ContactFormComponent>) {}

  save() {
    const contact = {
      firstName: this.firstName,
      lastName: this.lastName,
      phone: this.phone,
      email: this.email,
      address: this.address,
    };
    this.dialogRef.close(contact);
  }
}
