import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioCienciaCarreraComponent } from './formulario-ciencia-carrera.component';

describe('FormularioCienciaCarreraComponent', () => {
  let component: FormularioCienciaCarreraComponent;
  let fixture: ComponentFixture<FormularioCienciaCarreraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormularioCienciaCarreraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioCienciaCarreraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
