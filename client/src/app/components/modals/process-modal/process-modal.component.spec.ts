import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProcessModalComponent} from './process-modal.component';

describe('ProcessModalComponent', () => {
    let component: ProcessModalComponent;
    let fixture: ComponentFixture<ProcessModalComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ProcessModalComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ProcessModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
