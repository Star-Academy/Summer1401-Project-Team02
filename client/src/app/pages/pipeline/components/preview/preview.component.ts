import {Component, EventEmitter, Output} from '@angular/core';
import {PipelineService} from '../../../../services/pipeline/pipeline.service';

@Component({
    selector: 'app-preview',
    templateUrl: './preview.component.html',
    styleUrls: ['./preview.component.scss'],
})
export class PreviewComponent {
    public isCollapse = false;
    @Output() public isCollapseChange = new EventEmitter<boolean>();

    public constructor(public pipelineService: PipelineService) {}

    public changeCollapseState(): void {
        this.isCollapse = !this.isCollapse;

        this.isCollapseChange.emit(this.isCollapse);
    }
}
