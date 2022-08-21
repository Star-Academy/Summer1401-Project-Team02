import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {ModalComponent} from '../../components/modal/modal.component';
import {ModalService} from '../../services/modal.service';

@Component({
    selector: 'app-pipeline',
    templateUrl: './pipeline.component.html',
    styleUrls: ['./pipeline.component.scss'],
})
export class PipelineComponent implements AfterViewInit {
    @ViewChild('modal') public modalRef!: ModalComponent;
    public constructor(private modalService: ModalService) {}

    public ngAfterViewInit(): void {
        this.modalService.initComponent(this.modalRef);
    }

    public showSource(): void {
        this.modalService.showSource();
    }

    public showDestination(): void {
        this.modalService.showDestination();
    }
}
