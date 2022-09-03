import {Component} from '@angular/core';
import {ModalService} from '../../../services/modal/modal.service';

@Component({
    selector: 'app-source-modal',
    templateUrl: './source-modal.component.html',
    styleUrls: ['./source-modal.component.scss'],
})
export class SourceModalComponent {
    public isVisible = false;

    public style = {
        display: 'grid',
        placeItems: 'center',
    };
    public constructor(public modalService: ModalService) {
        this.modalService.initSourceComponent(this);
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
