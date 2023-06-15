import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionalityDetailsComponent } from './functionality-details.component';

describe('FunctionalityDetailsComponent', () => {
  let component: FunctionalityDetailsComponent;
  let fixture: ComponentFixture<FunctionalityDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FunctionalityDetailsComponent]
    });
    fixture = TestBed.createComponent(FunctionalityDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
