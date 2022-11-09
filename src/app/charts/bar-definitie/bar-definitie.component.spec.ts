import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarDefinitieComponent } from './bar-definitie.component';

describe('BarDefinitieComponent', () => {
  let component: BarDefinitieComponent;
  let fixture: ComponentFixture<BarDefinitieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarDefinitieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarDefinitieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
