import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PipelineService} from '../../../../../../services/pipeline/pipeline.service';
import {SplitNodeModel} from '../../../../../../models/split-node.model';

@Component({
    selector: 'app-split',
    templateUrl: './split.component.html',
    styleUrls: ['./split.component.scss'],
})
export class SplitComponent {
    @Input() public isReset = false;

    @Output() public selectNodeChange = new EventEmitter<SplitNodeModel>();
    @Output() public isResetChange = new EventEmitter<boolean>();

    public constructor(private pipelineService: PipelineService) {}
}
