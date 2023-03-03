import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { By } from '@angular/platform-browser';
import { Store, StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { contactsReducer } from 'src/store';
import { ContactDetailsComponent } from './contact-details.component';

describe('ContactDetailsComponent', () => {
  let component: ContactDetailsComponent;
  let fixture: ComponentFixture<ContactDetailsComponent>;
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
      selectedContact: null,
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContactDetailsComponent],
      imports: [
        MatCardModule,
        MatIconModule,
        StoreModule.forRoot({ contacts: contactsReducer }),
      ],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    store = TestBed.inject(Store) as MockStore;
    fixture = TestBed.createComponent(ContactDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not render if selectedContact$ is null', () => {
    spyOn(component.selectedContact$, 'pipe').and.returnValue(of(null));
    fixture.detectChanges();
    const contactDetails = fixture.debugElement.query(
      By.css('.contact-details')
    );
    expect(contactDetails).toBeNull();
  });

  it('should render when selectedContact exists', () => {
    store.setState({
      contacts: {
        ...initialState.contacts,
        selectedContact: initialState.contacts.contacts[0],
      },
    });
    fixture.detectChanges();
    const contactDetails = fixture.debugElement.query(
      By.css('.contact-details')
    );
    expect(contactDetails).toBeTruthy();
  });

  it('should show contact details', () => {
    const contact = initialState.contacts.contacts[0];
    store.setState({
      contacts: {
        ...initialState.contacts,
        selectedContact: contact,
      },
    });
    fixture.detectChanges();

    const contactDetails = fixture.debugElement
      .queryAll(By.css('p'))
      .map((debugEl) => debugEl.nativeElement);

    const [firstName, lastName, phone, email, address] = contactDetails;

    expect(firstName.textContent.trim()).toEqual(
      `First Name: ${contact.firstName}`
    );
    expect(lastName.textContent.trim()).toEqual(
      `Last Name: ${contact.lastName}`
    );
    expect(phone.textContent.trim()).toEqual(`Phone: ${contact.phone}`);
    expect(email.textContent.trim()).toEqual(`Email: ${contact.email}`);
    expect(address.textContent.trim()).toEqual(`Address: ${contact.address}`);
  });
});
