import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PipelineService} from '../../../../../../services/pipeline/pipeline.service';
import {StringNodeModel} from '../../../../../../models/string-node.model';

@Component({
    selector: 'app-string',
    templateUrl: './string.component.html',
    styleUrls: ['./string.component.scss'],
})
export class StringComponent {
    @Input() public isReset = false;

    @Output() public selectNodeChange = new EventEmitter<StringNodeModel>();
    @Output() public isResetChange = new EventEmitter<boolean>();

    public constructor(private pipelineService: PipelineService) {}
}
