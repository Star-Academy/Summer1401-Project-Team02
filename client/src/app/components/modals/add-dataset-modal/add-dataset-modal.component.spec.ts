import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AddDatasetModalComponent} from './add-dataset-modal.component';

describe('AddDatasetModalComponent', () => {
    let component: AddDatasetModalComponent;
    let fixture: ComponentFixture<AddDatasetModalComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AddDatasetModalComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AddDatasetModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
