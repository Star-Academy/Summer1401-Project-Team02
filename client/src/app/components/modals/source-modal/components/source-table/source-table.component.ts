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
export class SourceTableComponent implements OnInit {
    public searchValue = '';
    public visible!: boolean;
    public sourceTable: any;
    public sourceTableSearch: any;

    public constructor(public datasetService: DatasetService, public pipelineService: PipelineService) {}

    public async ngOnInit(): Promise<void> {
        this.sourceTable = await this.datasetService.getTables();
        this.sourceTableSearch = this.sourceTable;
    }

    public async reset(): Promise<void> {
        this.searchValue = '';
        this.search();
    }

    public search(): void {
        this.visible = false;
        this.sourceTable = this.sourceTableSearch.filter(
            (item: sourceItemData) => item._tableNameEnteredByUser.indexOf(this.searchValue) !== -1
        );
    }

    public getDownloadUrl(fileID: string, fileName: string, fileFormat: string): string {
        return `${API_DOWNLOAD_FILE}?tableId=${fileID}&tableName=${fileName}&fileFormat=${fileFormat}`;
    }

    public async checkBoxChanged(isChecked: boolean, id: string): Promise<void> {
        if (isChecked) {
            for (const tableRow of this.sourceTable) {
                if (tableRow._id !== id) {
                    tableRow._checked = false;
                }
            }
        }
        const sourceNode = this.pipelineService.getSelectedNode() as SourceNodeModel;
        if (sourceNode) {
            sourceNode._tableID = id;

            this.pipelineService.editNode(sourceNode);
            await this.pipelineService.preview();
        }
    }
}
