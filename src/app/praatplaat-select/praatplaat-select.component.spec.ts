import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PraatplaatSelectComponent } from './praatplaat-select.component';

describe('PraatplaatSelectComponent', () => {
  let component: PraatplaatSelectComponent;
  let fixture: ComponentFixture<PraatplaatSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PraatplaatSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PraatplaatSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
