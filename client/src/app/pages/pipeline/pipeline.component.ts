import {Component} from '@angular/core';
import {ModalService} from '../../services/modal.service';

@Component({
    selector: 'app-pipeline',
    templateUrl: './pipeline.component.html',
    styleUrls: ['./pipeline.component.scss'],
})
export class PipelineComponent {
    public constructor(public modalService: ModalService) {}
}