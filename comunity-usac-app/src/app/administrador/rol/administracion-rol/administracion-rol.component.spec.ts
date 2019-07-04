import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministracionRolComponent } from './administracion-rol.component';

describe('AdministracionRolComponent', () => {
  let component: AdministracionRolComponent;
  let fixture: ComponentFixture<AdministracionRolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministracionRolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministracionRolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
