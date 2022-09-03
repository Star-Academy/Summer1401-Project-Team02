import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectRemoveComponent } from './select-remove.component';

describe('SelectRemoveComponent', () => {
  let component: SelectRemoveComponent;
  let fixture: ComponentFixture<SelectRemoveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectRemoveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectRemoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
