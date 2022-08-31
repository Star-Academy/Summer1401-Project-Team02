import {Component, EventEmitter, Output} from '@angular/core';
import {PipelineService} from '../../../../services/pipeline/pipeline.service';
import {NodeType} from '../../../../enums/node-type';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
    public isCollapse = false;
    public editedNode = this.pipelineService.getSelectedNode();

    public isReset = false;

    @Output() public isCollapseChange = new EventEmitter<boolean>();

    // public sideType = 5;
    public get sideType(): number {
        switch (this.pipelineService.selectedTypeNode) {
            case NodeType.Selector:
                return 1;
            case NodeType.Custom:
                return 2;
            case NodeType.Split:
                return 3;
            case NodeType.Math:
                return 4;
            case NodeType.Aggregate:
                return 5;
            default:
                return 0;
        }
    }

    public constructor(public pipelineService: PipelineService) {
        this.editedNode = this.pipelineService.getSelectedNode();
    }

    public changeCollapseState(): void {
        this.isCollapse = !this.isCollapse;

        this.isCollapseChange.emit(this.isCollapse);
    }

    public onSave(): void {
        debugger;
        if (this.editedNode) this.pipelineService.editNode(this.editedNode);
    }

    public onReset(): void {
        this.isReset = true;
    }
}
