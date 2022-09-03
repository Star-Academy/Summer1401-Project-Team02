import {Component} from '@angular/core';
import {ModalService} from '../../services/modal/modal.service';
import {CanvasService} from "../../services/canvas/canvas.service";

@Component({
    selector: 'app-pipeline',
    templateUrl: './pipeline.component.html',
    styleUrls: ['./pipeline.component.scss'],
})
export class PipelineComponent {
    public isSidebarCollapse = false;
    public isPreviewCollapse = false;

    public constructor(public modalService: ModalService, public canvasService: CanvasService) {}
}
