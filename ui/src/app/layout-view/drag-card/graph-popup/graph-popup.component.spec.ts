import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphPopupComponent } from './graph-popup.component';

describe('GraphPopupComponent', () => {
  let component: GraphPopupComponent;
  let fixture: ComponentFixture<GraphPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraphPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
