import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {CustomNodeModel} from '../../../../../../models/custom-node.model';
import {PipelineService} from '../../../../../../services/pipeline/pipeline.service';

@Component({
    selector: 'app-custom',
    templateUrl: './custom.component.html',
    styleUrls: ['./custom.component.scss'],
})
export class CustomComponent implements OnInit, OnChanges {
    @Input() public isReset = false;

    @Output() public selectNodeChange = new EventEmitter<CustomNodeModel>();
    @Output() public isResetChange = new EventEmitter<boolean>();

    public selectNode!: CustomNodeModel;

    public firstInput = '';
    public secondInput = '';

    public constructor(private pipelineService: PipelineService) {}

    public async ngOnInit(): Promise<void> {
        this.selectNode = this.pipelineService.getSelectedNode() as CustomNodeModel;
        this.firstInput = this.selectNode._first;
        this.secondInput = this.selectNode._second;
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (this.isReset && !changes.isReset.previousValue) {
            this.reset();
        }
    }
    public reset(): void {
        this.firstInput = '';
        this.secondInput = '';
        this.selectNode._first = '';
        this.selectNode._second = '';

        this.isReset = false;
        this.selectNodeChange.emit(this.selectNode);
        this.isResetChange.emit(this.isReset);
    }

    public firstInputChange(event: string): void {
        this.selectNode._first = this.firstInput;
        this.selectNodeChange.emit(this.selectNode);
    }
    public secondInputChange(event: string): void {
        this.selectNode._second = this.secondInput;
        this.selectNodeChange.emit(this.selectNode);
    }
}
