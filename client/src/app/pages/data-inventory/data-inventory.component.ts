import {Component, OnInit} from '@angular/core';
import {ModalService} from '../../services/modal/modal.service';
import {DatasetService} from '../../services/dataset/dataset.service';
import {API_DOWNLOAD_FILE} from '../../utils/api.utils';
import {ItemData} from '../../models/itemData.model';

@Component({
    selector: 'app-data-inventory',
    templateUrl: './data-inventory.component.html',
    styleUrls: ['./data-inventory.component.scss'],
})
export class DataInventoryComponent implements OnInit {
    public searchValue = '';
    public visible!: boolean;

    public async ngOnInit(): Promise<void> {
        await this.datasetService.getTables();
    }

    public constructor(public modalService: ModalService, public datasetService: DatasetService) {}

    public async reset(): Promise<void> {
        this.searchValue = '';
        this.search();
        await this.datasetService.getTables();
    }

    public search(): void {
        this.visible = false;
        this.datasetService.tables = this.datasetService.tables.filter(
            (item: ItemData) => item._tableNameEnteredByUser.indexOf(this.searchValue) !== -1
        );
    }

    public getDownloadUrl(fileID: string, fileName: string, fileFormat: string): string {
        return `${API_DOWNLOAD_FILE}?tableId=${fileID}&tableName=${fileName}&fileFormat=${fileFormat}`;
    }

    public async deleteRow(id: string): Promise<void> {
        await this.datasetService.deleteTable(id);
        this.datasetService.tables = this.datasetService.tables.filter((d: ItemData) => d._id !== id);
    }
}
