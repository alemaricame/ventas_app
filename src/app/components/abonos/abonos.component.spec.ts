import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbonosComponent } from './abonos.component';

describe('AbonosComponent', () => {
  let component: AbonosComponent;
  let fixture: ComponentFixture<AbonosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbonosComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbonosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
