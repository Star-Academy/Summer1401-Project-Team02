import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceTableComponent } from './source-table.component';

describe('SourceTableComponent', () => {
  let component: SourceTableComponent;
  let fixture: ComponentFixture<SourceTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SourceTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SourceTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
