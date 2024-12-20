import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoItemComponent } from './logo-item.component';

describe('LogoItemComponent', () => {
  let component: LogoItemComponent;
  let fixture: ComponentFixture<LogoItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogoItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogoItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
