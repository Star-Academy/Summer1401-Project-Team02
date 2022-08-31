import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {MathNodeModel} from '../../../../../../models/math-node.model';
import {PipelineService} from '../../../../../../services/pipeline/pipeline.service';
import {SplitNodeModel} from '../../../../../../models/split-node.model';
import {MathFunction} from '../../../../../../enums/math-function';

@Component({
    selector: 'app-math',
    templateUrl: './math.component.html',
    styleUrls: ['./math.component.scss'],
})
export class MathComponent implements OnInit, OnChanges {
    @Input() public isReset = false;

    @Output() public selectNodeChange = new EventEmitter<MathNodeModel>();
    @Output() public isResetChange = new EventEmitter<boolean>();

    public isLoading = false;

    public selectNode!: MathNodeModel;

    public columns: string[] = [];
    public mathFunctionList: string[] = [
        'Sum',
        'Subtract',
        'Multiply',
        'Divide',
        'Modulo',
        'Bitwise And',
        'Bitwise Or',
        'Bitwise Xor',
    ];

    public firstColumnName: string = '';
    public secondColumnName: string = '';
    public mathFunction: MathFunction = -1;
    public wantsToNotReplace: boolean = false;

    public constructor(private pipelineService: PipelineService) {}

    public async ngOnInit(): Promise<void> {
        this.isLoading = true;
        this.columns = await this.pipelineService.getColumnsHeader();
        this.isLoading = false;

        this.selectNode = this.pipelineService.getSelectedNode() as MathNodeModel;
        this.firstColumnName = this.selectNode.firstColumnName;
        this.secondColumnName = this.selectNode.secondColumnName;
        this.mathFunction = this.selectNode.function;
        this.wantsToNotReplace = this.selectNode.newColumn;
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (this.isReset && !changes.isReset.previousValue) {
            this.reset();
        }
    }
    public reset(): void {
        this.firstColumnName = '';
        this.secondColumnName = '';
        this.mathFunction = -1;
        this.wantsToNotReplace = false;
        this.selectNode.firstColumnName = '';
        this.selectNode.secondColumnName = '';
        this.selectNode.function = -1;
        this.selectNode.newColumn = false;

        this.isReset = false;
        this.selectNodeChange.emit(this.selectNode);
        this.isResetChange.emit(this.isReset);
    }

    public firstColumnNameChange(event: string): void {
        this.selectNode.firstColumnName = this.firstColumnName;
        this.selectNodeChange.emit(this.selectNode);
    }
    public secondColumnNameChange(event: string): void {
        this.selectNode.secondColumnName = this.secondColumnName;
        this.selectNodeChange.emit(this.selectNode);
    }
    public mathFunctionChange(event: number): void {
        this.selectNode.function = this.mathFunction;
        this.selectNodeChange.emit(this.selectNode);
    }
    public wantToNotReplaceChange(event: boolean): void {
        this.selectNode.newColumn = this.wantsToNotReplace;
        this.selectNodeChange.emit(this.selectNode);
    }
}
