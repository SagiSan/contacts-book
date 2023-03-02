import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Store, StoreModule } from '@ngrx/store';
import { contactsReducer, selectContact } from 'src/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ContactsListComponent } from './contacts-list.component';
import { By } from '@angular/platform-browser';

describe('ContactsListComponent', () => {
  let component: ContactsListComponent;
  let fixture: ComponentFixture<ContactsListComponent>;
  let store: MockStore;

  const initialState = {
    contacts: {
      contacts: [
        {
          id: '1',
          firstName: 'test',
          lastName: 'tester',
          phone: '123',
          email: 'test@gmail.com',
          address: '123 test St',
        },
        {
          id: '2',
          firstName: 'test2',
          lastName: 'tester2',
          phone: '321',
          email: 'test2@gmail.com',
          address: '123 test2 St',
        },
      ],
      selectedContact: {
        id: '1',
        firstName: 'test',
        lastName: 'tester',
        phone: '123',
        email: 'test@gmail.com',
        address: '123 test St',
      },
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContactsListComponent],
      imports: [
        BrowserAnimationsModule,
        MatTableModule,
        StoreModule.forRoot({ contacts: contactsReducer }),
      ],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    store = TestBed.inject(Store) as MockStore;
    fixture = TestBed.createComponent(ContactsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display a table with contacts', () => {
    const table = fixture.debugElement.query(By.css('table'));
    expect(table).toBeTruthy();

    const rows = fixture.debugElement.queryAll(By.css('.mat-mdc-row'));
    expect(rows.length).toBe(2);
  });

  it('should call onSelectContact and dispatch selectContact', () => {
    spyOn(component, 'onSelectContact').and.callThrough();
    const storeSpy = spyOn(store, 'dispatch');

    const rows = fixture.debugElement.queryAll(By.css('.mat-mdc-row'));
    const testRow = rows[0];

    testRow.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(component.onSelectContact).toHaveBeenCalledWith({
      id: '1',
      firstName: 'test',
      lastName: 'tester',
      phone: '123',
      email: 'test@gmail.com',
      address: '123 test St',
    });
    expect(storeSpy).toHaveBeenCalledWith(selectContact({ contactId: '1' }));
  });

  it('should highlight selected row', () => {
    const rows = fixture.debugElement.queryAll(By.css('.mat-mdc-row'));
    const testRow = rows[0];

    expect(testRow.nativeElement).toHaveClass('selected');
  });
});
