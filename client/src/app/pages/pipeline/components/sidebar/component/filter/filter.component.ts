import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {SplitNodeModel} from '../../../../../../models/split-node.model';
import {PipelineService} from '../../../../../../services/pipeline/pipeline.service';
import {FilterNodeModel} from '../../../../../../models/filter-node.model';
import {MathFunction} from '../../../../../../enums/math-function';
import {ColumnFilteringOperation} from '../../../../../../enums/column-filtering-operator';
import {ColumnSelectorNodeModel} from '../../../../../../models/column-selector-node.model';

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnChanges {
    @Input() public isReset = false;
    @Input() public nodeId = '';

    @Output() public selectNodeChange = new EventEmitter<FilterNodeModel>();
    @Output() public isResetChange = new EventEmitter<boolean>();

    public isLoading = false;

    public selectNode!: FilterNodeModel;

    public columns: string[] = [];

    public columnName: string = '';
    public value: string = '';
    public filterFunction: ColumnFilteringOperation = -1;

    public filterFunctionList: string[] = [
        'Less Than',
        'Greater Than',
        'Less Than Or Equal To',
        'Greater Than Or Equal To',
        'Matches',
        'Contains',
        'Is Empty',
        'Is Null',
    ];

    public constructor(private pipelineService: PipelineService) {}

    // public async ngOnInit(): Promise<void> {
    //     this.isLoading = true;
    //     this.columns = await this.pipelineService.getColumnsHeader();
    //     this.isLoading = false;
    //
    //     this.selectNode = this.pipelineService.getSelectedNode() as FilterNodeModel;
    //     this.columnName = this.selectNode._columnName;
    //     this.value = this.selectNode.value;
    //     this.filterFunction = this.selectNode._operator;
    // }

    public async ngOnChanges(changes: SimpleChanges): Promise<void> {
        if (changes.nodeId && this.nodeId !== changes.nodeId.previousValue) {
            this.isLoading = true;
            this.columns = await this.pipelineService.getColumnsHeader();
            this.isLoading = false;

            this.selectNode = this.pipelineService.getSelectedNode() as FilterNodeModel;
            this.columnName = this.selectNode._columnName;
            this.value = this.selectNode.value;
            this.filterFunction = this.selectNode._operator;
        } else if (this.isReset && !changes.isReset.previousValue) {
            this.reset();
        }
    }
    public reset(): void {
        this.columnName = '';
        this.value = '';
        this.filterFunction = -1;
        this.selectNode._columnName = '';
        this.selectNode.value = '';
        this.selectNode._operator = -1;

        this.isReset = false;
        this.selectNodeChange.emit(this.selectNode);
        this.isResetChange.emit(this.isReset);
    }

    public columnNameChange(event: string): void {
        this.selectNode._columnName = this.columnName;
        this.selectNodeChange.emit(this.selectNode);
    }
    public valueChange(event: string): void {
        this.selectNode.value = this.value;
        this.selectNodeChange.emit(this.selectNode);
    }
    public filterFunctionChange(event: number): void {
        this.selectNode._operator = this.filterFunction;
        this.selectNodeChange.emit(this.selectNode);
    }
}
