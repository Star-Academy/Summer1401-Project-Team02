import {Component} from '@angular/core';
import {ModalService} from '../../../services/modal/modal.service';
import {NodeType} from '../../../enums/node-type';
import {PipelineService} from '../../../services/pipeline/pipeline.service';
import {CanvasService} from '../../../services/canvas/canvas.service';

@Component({
    selector: 'app-process-modal',
    templateUrl: './process-modal.component.html',
    styleUrls: ['./process-modal.component.scss'],
})
export class ProcessModalComponent {
    public isVisible = false;
    public NodeType = NodeType;

    public style = {
        display: 'grid',
        placeItems: 'center',
    };
    public constructor(
        public modalService: ModalService,
        private pipelineService: PipelineService,
        private canvasService: CanvasService
    ) {
        this.modalService.initProcessComponent(this);
    }

    public addNode(type: NodeType): void {
        this.pipelineService.addNode(type);

        this.canvasService.createNode(this.pipelineService.selectedIdNode, type);
        this.canvasService.resetEdge();
        this.canvasService.layout();
        this.handleHide();
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
