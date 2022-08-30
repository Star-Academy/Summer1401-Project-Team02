import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CustomNodeModel} from '../../../../../../models/custom-node.model';
import {PipelineService} from '../../../../../../services/pipeline/pipeline.service';

@Component({
    selector: 'app-custom',
    templateUrl: './custom.component.html',
    styleUrls: ['./custom.component.scss'],
})
export class CustomComponent {
    @Input() public isReset = false;

    @Output() public selectNodeChange = new EventEmitter<CustomNodeModel>();
    @Output() public isResetChange = new EventEmitter<boolean>();

    public constructor(private pipelineService: PipelineService) {}
}
