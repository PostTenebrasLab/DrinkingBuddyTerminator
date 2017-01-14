/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ApitestComponent } from './apitest.component';

describe('ApitestComponent', () => {
  let component: ApitestComponent;
  let fixture: ComponentFixture<ApitestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApitestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApitestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
