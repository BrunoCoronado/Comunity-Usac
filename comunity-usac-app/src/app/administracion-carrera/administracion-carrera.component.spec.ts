import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministracionCarreraComponent } from './administracion-carrera.component';

describe('AdministracionCarreraComponent', () => {
  let component: AdministracionCarreraComponent;
  let fixture: ComponentFixture<AdministracionCarreraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministracionCarreraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministracionCarreraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
