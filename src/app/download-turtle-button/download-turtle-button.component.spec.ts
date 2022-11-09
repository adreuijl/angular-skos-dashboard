import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadTurtleButtonComponent } from './download-turtle-button.component';

describe('DownloadTurtleButtonComponent', () => {
  let component: DownloadTurtleButtonComponent;
  let fixture: ComponentFixture<DownloadTurtleButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownloadTurtleButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadTurtleButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
