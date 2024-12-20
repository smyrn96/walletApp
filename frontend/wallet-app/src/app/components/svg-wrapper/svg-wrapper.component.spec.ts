import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgWrapperComponent } from './svg-wrapper.component';

describe('SvgWrapperComponent', () => {
  let component: SvgWrapperComponent;
  let fixture: ComponentFixture<SvgWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SvgWrapperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
