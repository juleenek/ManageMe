import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FunctionalityFormComponent } from '../../forms/functionality-form/functionality-form.component';


describe('FunctionalityFormComponent', () => {
  let component: FunctionalityFormComponent;
  let fixture: ComponentFixture<FunctionalityFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FunctionalityFormComponent]
    });
    fixture = TestBed.createComponent(FunctionalityFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
