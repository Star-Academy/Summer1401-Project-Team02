import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {PipelineService} from '../../../../../../services/pipeline/pipeline.service';
import {ColumnSelectorNodeModel} from '../../../../../../models/column-selector-node.model';

@Component({
    selector: 'app-select-remove',
    templateUrl: './select-remove.component.html',
    styleUrls: ['./select-remove.component.scss'],
})
export class SelectRemoveComponent implements OnInit, OnChanges {
    public isLoading = false;
    public select = 'Select';
    public remove = 'Remove';

    public selectType: 'Select' | 'Remove' = 'Select';
    public selectedColumns: string[] = [];
    public columns: string[] = [];
    public selectNode!: ColumnSelectorNodeModel;

    @Input() public isReset = false;

    @Output() public selectNodeChange = new EventEmitter<ColumnSelectorNodeModel>();
    @Output() public isResetChange = new EventEmitter<boolean>();

    public constructor(private pipelineService: PipelineService) {}

    public async ngOnInit(): Promise<void> {
        this.isLoading = true;
        this.columns = await this.pipelineService.getColumnsHeader();

        this.selectNode = this.pipelineService.getSelectedNode() as ColumnSelectorNodeModel;
        this.isLoading = false;
    }
    public ngOnChanges(changes: SimpleChanges): void {
        if (this.isReset && !changes.isReset.previousValue) {
            this.reset();
        }
    }

    public reset(): void {
        this.selectType = 'Select';
        this.selectedColumns = [];

        this.isReset = false;
        this.isResetChange.emit(this.isReset);
    }

    public selectTypeChange(value: string): void {
        if (value === this.select) {
            this.selectNode._columns = this.selectedColumns;
            this.selectType = 'Select';
        } else if (value === this.remove) {
            this.selectNode._columns = this.columns.filter((colName) => !this.selectedColumns.includes(colName));
            this.selectType = 'Remove';
        }
    }

    public setColumns(value: string[]): void {
        this.selectedColumns = value;

        if (this.selectType === this.select) {
            this.selectNode._columns = this.selectedColumns;
        } else {
            this.selectNode._columns = this.columns.filter((colName) => !this.selectedColumns.includes(colName));
        }

        this.selectNodeChange.emit(this.selectNode);
    }
}
