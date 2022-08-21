import {Component} from '@angular/core';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
    public isVisible = false;
    public isSource = true;
    public title?: string;

    public style = {
        display: 'grid',
        placeItems: 'center',
    };

    public showSourceModal(): void {
        this.isSource = true;
        this.isVisible = true;
        this.title = 'Source';
    }

    public showDestinationModal(): void {
        this.isSource = false;
        this.isVisible = true;
        this.title = 'Destination';
    }

    public handleOk(): void {
        this.isVisible = false;
    }

    public handleCancel(): void {
        this.isVisible = false;
    }
}
