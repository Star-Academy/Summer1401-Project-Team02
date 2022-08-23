import {Injectable} from '@angular/core';
import {SourceModalComponent} from '../components/modals/source-modal/source-modal.component';
import {DestinationModalComponent} from '../components/modals/destination-modal/destination-modal.component';

@Injectable({
    providedIn: 'root',
})
export class ModalService {
    private sourceModalComponent!: SourceModalComponent;
    private destinationModalComponent!: DestinationModalComponent;

    public initSourceComponent(sourceModalComponent: SourceModalComponent): void {
        this.sourceModalComponent = sourceModalComponent;
    }

    public initDestinationComponent(destinationModalComponent: DestinationModalComponent): void {
        this.destinationModalComponent = destinationModalComponent;
    }

    public showSource(): void {
        this.sourceModalComponent?.showModal();
    }

    public showDestination(): void {
        this.destinationModalComponent?.showModal();
    }
}
