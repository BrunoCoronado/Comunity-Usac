import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministracionFacultadComponent } from './administracion-facultad.component';

describe('AdministracionFacultadComponent', () => {
  let component: AdministracionFacultadComponent;
  let fixture: ComponentFixture<AdministracionFacultadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministracionFacultadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministracionFacultadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
