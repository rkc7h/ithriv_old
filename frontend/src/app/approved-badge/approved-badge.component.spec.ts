import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ApprovedBadgeComponent } from './approved-badge.component';
import { MockResourceApiService } from '../shared/resource-api/mocks/resource-api.service.mock';
import { ResourceApiService } from '../shared/resource-api/resource-api.service';
import { MatTooltip } from '@angular/material';
import { Resource } from '../resource';

describe('ApprovedBadgeComponent', () => {
  let component: ApprovedBadgeComponent;
  let fixture: ComponentFixture<ApprovedBadgeComponent>;
  let api: MockResourceApiService;
  const resource: Resource = {
    id: 999,
    name: 'R2-D2',
    description: 'Has seen things you people wouldn\'t believe: Attack ships on fire off the shoulder of Orion...',
    owner: 'queen-amidala@naboo.gov, obi.wan@jedi-temple.net, capt.antilles@mil.alderaan.gov',
    owners: ['queen-amidala@naboo.gov', 'obi.wan@jedi-temple.net', 'capt.antilles@mil.alderaan.gov'],
    contact_email: 'r2d2@rebels.org',
    contact_notes: 'Ask about the Clone Wars.',
    contact_phone: '975-310-8642',
    cost: 'More than you can afford',
    favorite_count: 888,
    institution_id: 777,
    type_id: 666,
    website: 'https://www.rebels.org/r2d2',
    approved: 'Unapproved',
    user_may_view: false,
    user_may_edit: false,
    last_updated: '1977-05-25T00:00:000Z',
    favorites: [],
    availabilities: [],
  };

  beforeEach(async(() => {
    api = new MockResourceApiService();

    TestBed.configureTestingModule({
      declarations: [ApprovedBadgeComponent, MatTooltip],
      providers: [
        { provide: ResourceApiService, useClass: MockResourceApiService }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(ApprovedBadgeComponent);
        component = fixture.debugElement.componentInstance;
        component.resource = resource;
        fixture.detectChanges();
      });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
