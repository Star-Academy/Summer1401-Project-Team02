import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {PipelineService} from '../../../../services/pipeline/pipeline.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
    public isCollapse = false;
    public sideType = 1;

    @Output() public isCollapseChange = new EventEmitter<boolean>();

    public constructor(public pipelineService: PipelineService) {}

    public changeCollapseState(): void {
        this.isCollapse = !this.isCollapse;

        this.isCollapseChange.emit(this.isCollapse);
    }
}
