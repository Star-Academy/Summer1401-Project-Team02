import {Component, OnInit} from '@angular/core';
import {DatasetService} from '../../../../../services/dataset/dataset.service';
import {API_DOWNLOAD_FILE} from '../../../../../utils/api.utils';
import {sourceItemData} from '../../../../../models/itemData.model';
import {SourceNodeModel} from '../../../../../models/source-node.model';
import {PipelineService} from '../../../../../services/pipeline/pipeline.service';

@Component({
    selector: 'app-source-table',
    templateUrl: './source-table.component.html',
    styleUrls: ['./source-table.component.scss'],
})
export class SourceTableComponent {
    public searchValue = '';
    public visible!: boolean;
    public sourceTable: any;

    // public async ngOnInit(): Promise<void> {
    //     await this.datasetService.getTables();
    //     this.sourceTable = this.datasetService.tables;
    //     console.log(this.sourceTable);
    // }

    public constructor(public datasetService: DatasetService, public pipelineService: PipelineService) {
        // this.sourceTable = this.datasetService.tables;
        this.datasetService.getTables();
    }

    public reset(): void {
        this.searchValue = '';
        this.search();
        this.datasetService.getTables();
    }
    public search(): void {
        this.visible = false;
        this.datasetService.tables = this.datasetService.tables.filter(
            (item: sourceItemData) => item._tableNameEnteredByUser.indexOf(this.searchValue) !== -1
        );
    }

    public getDownloadUrl(fileID: string, fileName: string, fileFormat: string): string {
        return `${API_DOWNLOAD_FILE}?tableId=${fileID}&tableName=${fileName}&fileFormat=${fileFormat}`;
    }

    public checkBoxChanged(isChecked: boolean, id: string): void {
        // this.datasetService.tables.forEach((tableRow)=>{
        //     this.datasetService.tables[id] = isChecked;
        // })

        // this.sourceTable = this.sourceTable
        //     .filter((tableRow: any) => tableRow._id !== id)
        //     .map((tableRow: any) => (tableRow._checked = !isChecked));

        this.sourceTable[id]._checked = isChecked;
        const sourceNode = this.pipelineService.getSelectedNode() as SourceNodeModel;
        if (sourceNode) {
            sourceNode._tableID = id;

            this.pipelineService.editNode(sourceNode);
            this.pipelineService.preview();
        }
    }
}
