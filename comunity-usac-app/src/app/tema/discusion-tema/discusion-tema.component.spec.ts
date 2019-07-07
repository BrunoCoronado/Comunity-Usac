import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscusionTemaComponent } from './discusion-tema.component';

describe('DiscusionTemaComponent', () => {
  let component: DiscusionTemaComponent;
  let fixture: ComponentFixture<DiscusionTemaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscusionTemaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscusionTemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
