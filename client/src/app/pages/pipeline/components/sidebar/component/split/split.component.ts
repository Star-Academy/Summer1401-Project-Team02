import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {PipelineService} from '../../../../../../services/pipeline/pipeline.service';
import {SplitNodeModel} from '../../../../../../models/split-node.model';
import {CustomNodeModel} from '../../../../../../models/custom-node.model';

@Component({
    selector: 'app-split',
    templateUrl: './split.component.html',
    styleUrls: ['./split.component.scss'],
})
export class SplitComponent implements OnInit, OnChanges {
    @Input() public isReset = false;

    @Output() public selectNodeChange = new EventEmitter<SplitNodeModel>();
    @Output() public isResetChange = new EventEmitter<boolean>();

    public isLoading = false;

    public selectNode!: SplitNodeModel;

    public columns: string[] = [];

    public columnName: string = '';
    public delimiter: string = '';
    public numberOfParts: number = 0;
    public wantsToReplace: boolean = false;

    public constructor(private pipelineService: PipelineService) {}

    public async ngOnInit(): Promise<void> {
        this.isLoading = true;
        this.columns = await this.pipelineService.getColumnsHeader();
        this.isLoading = false;

        this.selectNode = this.pipelineService.getSelectedNode() as SplitNodeModel;
        this.columnName = this.selectNode._columnName;
        this.delimiter = this.selectNode._delimeter;
        this.numberOfParts = this.selectNode._numberOfParts;
        this.wantsToReplace = this.selectNode.replace;
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (this.isReset && !changes.isReset.previousValue) {
            this.reset();
        }
    }
    public reset(): void {
        this.columnName = '';
        this.delimiter = '';
        this.numberOfParts = 0;
        this.wantsToReplace = false;
        this.selectNode._columnName = '';
        this.selectNode._delimeter = '';
        this.selectNode._numberOfParts = 0;
        this.selectNode.replace = false;

        this.isReset = false;
        this.selectNodeChange.emit(this.selectNode);
        this.isResetChange.emit(this.isReset);
    }

    public columnNameChange(event: string): void {
        this.selectNode._columnName = this.columnName;
        this.selectNodeChange.emit(this.selectNode);
    }
    public delimiterChange(event: string): void {
        this.selectNode._delimeter = this.delimiter;
        this.selectNodeChange.emit(this.selectNode);
    }
    public numberOfPartChange(event: number): void {
        this.selectNode._numberOfParts = this.numberOfParts;
        this.selectNodeChange.emit(this.selectNode);
    }
    public wantToReplaceChange(event: boolean): void {
        this.selectNode.replace = this.wantsToReplace;
        this.selectNodeChange.emit(this.selectNode);
    }
}
