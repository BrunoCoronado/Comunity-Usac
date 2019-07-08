import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelConversacionesComponent } from './panel-conversaciones.component';

describe('PanelConversacionesComponent', () => {
  let component: PanelConversacionesComponent;
  let fixture: ComponentFixture<PanelConversacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelConversacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelConversacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
