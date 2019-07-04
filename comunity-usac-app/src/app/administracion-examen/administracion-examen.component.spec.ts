import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministracionExamenComponent } from './administracion-examen.component';

describe('AdministracionExamenComponent', () => {
  let component: AdministracionExamenComponent;
  let fixture: ComponentFixture<AdministracionExamenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministracionExamenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministracionExamenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
