import {Component, EventEmitter, Output} from '@angular/core';
import {PipelineService} from '../../../../services/pipeline/pipeline.service';
import {NodeType} from '../../../../enums/node-type';
import {JoinService} from '../../../../services/join/join.service';
import {NzMessageService} from 'ng-zorro-antd/message';

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

    public constructor(
        public pipelineService: PipelineService,
        private joinService: JoinService,
        public messageService: NzMessageService
    ) {
        this.editedNode = this.pipelineService.getSelectedNode();
    }

    public changeCollapseState(): void {
        this.isCollapse = !this.isCollapse;

        this.isCollapseChange.emit(this.isCollapse);
    }

    public onSave(): void {
        debugger;
        if (this.pipelineService.selectedTypeNode === NodeType.Join) {
            this.editedNode = this.joinService.emit();
        }
        if (this.editedNode) this.pipelineService.editNode(this.editedNode);
        this.messageService.create('success', 'success');
    }

    public onReset(): void {
        this.isReset = true;
    }
}
