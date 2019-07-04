import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioCarreraComponent } from './formulario-carrera.component';

describe('FormularioCarreraComponent', () => {
  let component: FormularioCarreraComponent;
  let fixture: ComponentFixture<FormularioCarreraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormularioCarreraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioCarreraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
