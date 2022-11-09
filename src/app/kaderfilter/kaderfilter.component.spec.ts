import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KaderfilterComponent } from './kaderfilter.component';

describe('KaderfilterComponent', () => {
  let component: KaderfilterComponent;
  let fixture: ComponentFixture<KaderfilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KaderfilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KaderfilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
