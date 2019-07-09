import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioSalaComponent } from './formulario-sala.component';

describe('FormularioSalaComponent', () => {
  let component: FormularioSalaComponent;
  let fixture: ComponentFixture<FormularioSalaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormularioSalaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioSalaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
