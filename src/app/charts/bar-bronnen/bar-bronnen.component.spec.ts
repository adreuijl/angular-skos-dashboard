import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarBronnenComponent } from './bar-bronnen.component';

describe('BarBronnenComponent', () => {
  let component: BarBronnenComponent;
  let fixture: ComponentFixture<BarBronnenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarBronnenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarBronnenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
