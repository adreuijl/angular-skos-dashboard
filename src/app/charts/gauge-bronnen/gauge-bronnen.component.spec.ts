import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GaugeBronnenComponent } from './gauge-bronnen.component';

describe('GaugeBronnenComponent', () => {
  let component: GaugeBronnenComponent;
  let fixture: ComponentFixture<GaugeBronnenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GaugeBronnenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GaugeBronnenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
