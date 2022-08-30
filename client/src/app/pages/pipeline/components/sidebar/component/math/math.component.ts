import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MathNodeModel} from '../../../../../../models/math-node.model';
import {PipelineService} from '../../../../../../services/pipeline/pipeline.service';

@Component({
    selector: 'app-math',
    templateUrl: './math.component.html',
    styleUrls: ['./math.component.scss'],
})
export class MathComponent {
    @Input() public isReset = false;

    @Output() public selectNodeChange = new EventEmitter<MathNodeModel>();
    @Output() public isResetChange = new EventEmitter<boolean>();

    public constructor(private pipelineService: PipelineService) {}
}
