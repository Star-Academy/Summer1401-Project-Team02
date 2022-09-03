import {Component} from '@angular/core';
import {PipelineService} from '../../../../../../services/pipeline/pipeline.service';

@Component({
    selector: 'app-default',
    templateUrl: './default.component.html',
    styleUrls: ['./default.component.scss'],
})
export class DefaultComponent {
    public constructor(public pipelineService: PipelineService) {}
}
