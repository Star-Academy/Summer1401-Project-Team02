import {Injectable} from '@angular/core';
import {ModalComponent} from '../components/modal/modal.component';

@Injectable({
    providedIn: 'root',
})
export class ModalService {
    private sourceModalComponent!: ModalComponent;

    public initComponent(sourceModalComponent: ModalComponent): void {
        this.sourceModalComponent = sourceModalComponent;
    }

    public showSource(): void {
        this.sourceModalComponent?.showSourceModal();
    }

    public showDestination(): void {
        this.sourceModalComponent?.showDestinationModal();
    }
}
