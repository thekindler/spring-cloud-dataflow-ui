import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LicencePlateComponent } from './licence-plate.component';

describe('LicencePlateComponent', () => {
  let component: LicencePlateComponent;
  let fixture: ComponentFixture<LicencePlateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LicencePlateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LicencePlateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
