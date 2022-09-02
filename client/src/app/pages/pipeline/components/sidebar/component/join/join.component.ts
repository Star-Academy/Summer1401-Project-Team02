import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {MathFunction} from '../../../../../../enums/math-function';
import {PipelineService} from '../../../../../../services/pipeline/pipeline.service';
import {JoinNodeModel} from '../../../../../../models/join-node.model';
import {ModalService} from '../../../../../../services/modal/modal.service';
import {JoinService} from '../../../../../../services/join/join.service';
import {JoinMode} from '../../../../../../enums/join-mode';
import {ColumnSelectorNodeModel} from '../../../../../../models/column-selector-node.model';

@Component({
    selector: 'app-join',
    templateUrl: './join.component.html',
    styleUrls: ['./join.component.scss'],
})
export class JoinComponent implements OnChanges {
    @Input() public isReset = false;
    @Input() public nodeId = '';

    @Output() public selectNodeChange = new EventEmitter<JoinNodeModel>();
    @Output() public isResetChange = new EventEmitter<boolean>();

    public constructor(
        private pipelineService: PipelineService,
        public modalService: ModalService,
        public joinService: JoinService
    ) {}

    // public async ngOnInit(): Promise<void> {
    //     this.joinService.selectNode = this.pipelineService.getSelectedNode() as JoinNodeModel;
    // }

    public async ngOnChanges(changes: SimpleChanges): Promise<void> {
        if (changes.nodeId && this.nodeId !== changes.nodeId.previousValue) {
            this.joinService.isLoading = true;
            this.joinService.selectNode = this.pipelineService.getSelectedNode() as JoinNodeModel;
            if (!!this.joinService.selectNode._secondPreviousNode) {
                this.joinService.sourceColumns = await this.pipelineService.getColumnsHeader();
                this.joinService.secondaryColumns = await this.pipelineService.getSecondaryNodeColumnHeader(
                    this.joinService.selectNode._secondPreviousNode
                );
            }
            this.joinService.isLoading = false;
        } else if (this.isReset && !changes.isReset.previousValue) {
            this.reset();
        }
    }
    public reset(): void {
        this.joinService.selectNode._primaryColumn = '';
        this.joinService.selectNode._secondaryColumn = '';

        this.isReset = false;
        this.selectNodeChange.emit(this.joinService.selectNode);
        this.isResetChange.emit(this.isReset);
    }

    // public sourceColumnNameChange(event: string): void {
    //     this.selectNode._primaryColumns = this.sourceColumnName;
    //     this.selectNodeChange.emit(this.selectNode);
    // }
    // public secondaryColumnNameChange(event: string): void {
    //     this.selectNode._secondaryColumns = this.secondaryColumnName;
    //     this.selectNodeChange.emit(this.selectNode);
    // }
    // public joinModeChange(): void {}
}
