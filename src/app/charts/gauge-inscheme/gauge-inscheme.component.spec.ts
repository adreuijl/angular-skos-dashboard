import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GaugeInschemeComponent } from './gauge-inscheme.component';

describe('GaugeInschemeComponent', () => {
  let component: GaugeInschemeComponent;
  let fixture: ComponentFixture<GaugeInschemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GaugeInschemeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GaugeInschemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
