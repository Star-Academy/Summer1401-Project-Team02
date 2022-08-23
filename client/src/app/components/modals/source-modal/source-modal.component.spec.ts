import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SourceModalComponent} from './source-modal.component';

describe('SourceModalComponent', () => {
    let component: SourceModalComponent;
    let fixture: ComponentFixture<SourceModalComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SourceModalComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SourceModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
