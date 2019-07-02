import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministracionCienciaComponent } from './administracion-ciencia.component';

describe('AdministracionCienciaComponent', () => {
  let component: AdministracionCienciaComponent;
  let fixture: ComponentFixture<AdministracionCienciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministracionCienciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministracionCienciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
