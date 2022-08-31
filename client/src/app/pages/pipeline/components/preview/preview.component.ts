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

    public get keys(): string[] | null {
        if (this.pipelineService.previewContent[0]) return Object.keys(this.pipelineService.previewContent[0]);
        return null;
    }

    public get values(): any[] | null {
        if (this.pipelineService.previewContent) {
            const table: any[] = [];
            this.pipelineService.previewContent.forEach((obj: any) => {
                table.push(Object.values(obj));
            });
            return table;
        }
        return null;
    }

    public constructor(public pipelineService: PipelineService) {}

    public changeCollapseState(): void {
        this.isCollapse = !this.isCollapse;

        this.isCollapseChange.emit(this.isCollapse);
    }
}
