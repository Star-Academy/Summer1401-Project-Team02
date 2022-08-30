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

    // public keys: string[] = Object.keys(this.pipelineService.previewContent[0]);

    // public values: any[] = this.pipelineService.previewContent.map((obj: any) => obj.values(obj));
    public get keys(): string[] {
        return Object.keys(this.pipelineService.previewContent[0]);
    }

    public get values(): any[] {
        const table: any[] = [];
        this.pipelineService.previewContent.forEach((obj: any) => {
            table.push(Object.values(obj));
        });
        return table;
    }

    public constructor(public pipelineService: PipelineService) {}

    public changeCollapseState(): void {
        this.isCollapse = !this.isCollapse;

        this.isCollapseChange.emit(this.isCollapse);
    }
}
