import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DestinationInputComponent} from './destination-input.component';

describe('DestinationInputComponent', () => {
    let component: DestinationInputComponent;
    let fixture: ComponentFixture<DestinationInputComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DestinationInputComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DestinationInputComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
