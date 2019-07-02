import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioCienciaComponent } from './formulario-ciencia.component';

describe('FormularioCienciaComponent', () => {
  let component: FormularioCienciaComponent;
  let fixture: ComponentFixture<FormularioCienciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormularioCienciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioCienciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
