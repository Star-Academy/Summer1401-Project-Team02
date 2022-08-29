import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {PipelineService} from '../../../../services/pipeline/pipeline.service';
import {NodeType} from '../../../../enums/node-type';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
    public isCollapse = false;
    public NodeType = NodeType;

    @Output() public isCollapseChange = new EventEmitter<boolean>();

    public get sideType(): number {
        switch (this.pipelineService.selectedTypeNode) {
            case NodeType.Selector:
                return 1;
            default:
                return 0;
        }
    }

    public constructor(public pipelineService: PipelineService) {}

    public changeCollapseState(): void {
        this.isCollapse = !this.isCollapse;

        this.isCollapseChange.emit(this.isCollapse);
    }
}
