import {Component} from '@angular/core';
import {ModalService} from '../../../services/modal/modal.service';

@Component({
    selector: 'app-add-dataset-modal',
    templateUrl: './add-dataset-modal.component.html',
    styleUrls: ['./add-dataset-modal.component.scss'],
})
export class AddDatasetModalComponent {
    public isVisible = false;

    public style = {
        display: 'grid',
        placeItems: 'center',
    };

    public constructor(public modalService: ModalService) {
        this.modalService.initAddDatasetComponent(this);
    }

    public showModal(): void {
        this.isVisible = true;
    }

    public handleOk(): void {
        this.isVisible = false;
    }

    public handleHide(): void {
        this.isVisible = false;
    }
}
