import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {CustomNodeModel} from '../../../../../../models/custom-node.model';
import {PipelineService} from '../../../../../../services/pipeline/pipeline.service';
import {AggregateFunction} from '../../../../../../enums/aggregate-function';
import {AggregateNodeModel} from '../../../../../../models/aggregate-node.model';
import {ColumnSelectorNodeModel} from '../../../../../../models/column-selector-node.model';

@Component({
    selector: 'app-aggregate',
    templateUrl: './aggregate.component.html',
    styleUrls: ['./aggregate.component.scss'],
})
export class AggregateComponent implements OnChanges {
    @Input() public isReset = false;
    @Input() public nodeId = '';

    @Output() public selectNodeChange = new EventEmitter<AggregateNodeModel>();
    @Output() public isResetChange = new EventEmitter<boolean>();

    public selectNode!: AggregateNodeModel;

    public isLoading = false;

    public columns: string[] = [];
    public aggregateFunctionList: string[] = ['Count', 'Sum', 'Average', 'Minimum', 'Maximum'];

    public groupingColumns: string[] = [];

    public functions: {Item1: AggregateFunction; Item2: string; Item3: string}[] = [{Item1: -1, Item2: '', Item3: ''}];

    public constructor(private pipelineService: PipelineService) {}

    // public async ngOnInit(): Promise<void> {
    //     this.isLoading = true;
    //     this.columns = await this.pipelineService.getColumnsHeader();
    //     this.isLoading = false;
    //
    //     this.selectNode = this.pipelineService.getSelectedNode() as AggregateNodeModel;
    //
    //     if (this.selectNode._functions.length !== 0) this.functions = this.selectNode._functions;
    //     this.groupingColumns = this.selectNode._groupingColumns;
    // }

    public async ngOnChanges(changes: SimpleChanges): Promise<void> {
        if (changes.nodeId && this.nodeId !== changes.nodeId.previousValue) {
            this.isLoading = true;
            this.columns = await this.pipelineService.getColumnsHeader();
            this.isLoading = false;

            this.selectNode = this.pipelineService.getSelectedNode() as AggregateNodeModel;

            if (this.selectNode._functions.length !== 0) this.functions = this.selectNode._functions;
            this.groupingColumns = this.selectNode._groupingColumns;
        } else if (this.isReset && !changes.isReset.previousValue) {
            this.reset();
        }
    }

    public reset(): void {
        this.functions = [{Item1: -1, Item2: '', Item3: ''}];
        this.groupingColumns = [];
        this.selectNode._functions = this.functions;
        this.selectNode._groupingColumns = this.groupingColumns;

        this.isReset = false;
        this.selectNodeChange.emit(this.selectNode);
        this.isResetChange.emit(this.isReset);
    }

    public addFunction(): void {
        const newFunction = {Item1: -1, Item2: '', Item3: ''};

        this.functions.push(newFunction);
    }
    public removeFunction(index: number): void {
        if (index === 0) return;

        this.functions.splice(index, 1);
    }

    public operationChange(value: AggregateFunction, index: number): void {
        this.functions[index].Item1 = value;
        this.selectNode._functions = this.functions;
        this.selectNodeChange.emit(this.selectNode);
    }
    public operationColumnNameChange(value: string, index: number): void {
        this.functions[index].Item2 = value;
        this.selectNode._functions = this.functions;
        this.selectNodeChange.emit(this.selectNode);
    }
    public operationNewColumnNameChange(value: string, index: number): void {
        this.functions[index].Item3 = value;
        this.selectNode._functions = this.functions;
        this.selectNodeChange.emit(this.selectNode);
    }
    public groupingColumnChange(value: string[]): void {
        this.groupingColumns = value;
        this.selectNode._groupingColumns = this.groupingColumns;
        this.selectNodeChange.emit(this.selectNode);
    }
}
