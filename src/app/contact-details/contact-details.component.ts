import { ChangeDetectionStrategy, Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactDetailsComponent {
  selectedContact$: Observable<Contact | null>;

  constructor(private store: Store<{ contacts: ContactsState }>) {
    this.selectedContact$ = this.store.pipe(select(selectSelectedContact));
  }

  clearSelection(): void {
    this.store.dispatch(clearSelectedContact());
  }
}
