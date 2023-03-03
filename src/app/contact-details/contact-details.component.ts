import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import {
  clearSelectedContact,
  Contact,
  ContactsState,
  selectSelectedContact,
} from 'src/store';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss'],
})
export class ContactDetailsComponent implements OnInit {
  selectedContact$: Observable<Contact | null> = of(null);

  constructor(private store: Store<{ contacts: ContactsState }>) {}

  ngOnInit(): void {
    this.selectedContact$ = this.store.pipe(select(selectSelectedContact));
  }

  clearSelection(): void {
    this.store.dispatch(clearSelectedContact());
  }
}
