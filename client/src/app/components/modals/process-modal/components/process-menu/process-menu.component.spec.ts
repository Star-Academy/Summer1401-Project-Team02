import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProcessMenuComponent} from './process-menu.component';

describe('ProcessMenuComponent', () => {
    let component: ProcessMenuComponent;
    let fixture: ComponentFixture<ProcessMenuComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ProcessMenuComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ProcessMenuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});