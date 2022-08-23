import {ChangeDetectorRef, Component} from '@angular/core';
import {ModalService} from '../../../services/modal.service';

@Component({
    selector: 'app-destination-modal',
    templateUrl: './destination-modal.component.html',
    styleUrls: ['./destination-modal.component.scss'],
})
export class DestinationModalComponent {
    public isVisible = false;

    public style = {
        display: 'grid',
        placeItems: 'center',
    };

    public constructor(public changeDetectorRef: ChangeDetectorRef, public modalService: ModalService) {
        this.modalService.initDestinationComponent(this);
    }

    public showModal(): void {
        this.isVisible = true;
        this.changeDetectorRef.detectChanges();
    }

    public handleOk(): void {
        this.isVisible = false;
    }

    public handleHide(): void {
        this.isVisible = false;
    }
}
