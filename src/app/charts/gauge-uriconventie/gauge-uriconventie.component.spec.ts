import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GaugeUriconventieComponent } from './gauge-uriconventie.component';

describe('GaugeUriconventieComponent', () => {
  let component: GaugeUriconventieComponent;
  let fixture: ComponentFixture<GaugeUriconventieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GaugeUriconventieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GaugeUriconventieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
