import {Component} from '@angular/core';
import {PipelineService} from '../../../../../services/pipeline/pipeline.service';
import {NodeType} from '../../../../../enums/node-type';
import {CanvasService} from '../../../../../services/canvas/canvas.service';
import {ModalService} from '../../../../../services/modal/modal.service';

@Component({
    selector: 'app-process-menu',
    templateUrl: './process-menu.component.html',
    styleUrls: ['./process-menu.component.scss'],
})
export class ProcessMenuComponent {}
