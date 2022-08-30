import {Component, OnInit} from '@angular/core';
import {ModalService} from '../../services/modal/modal.service';
import {DatasetService} from '../../services/dataset/dataset.service';
import {API_DOWNLOAD_FILE} from '../../utils/api.utils';
interface ItemData {
    _tableName: string;
    _dateTime: string;
}
@Component({
    selector: 'app-data-inventory',
    templateUrl: './data-inventory.component.html',
    styleUrls: ['./data-inventory.component.scss'],
})
export class DataInventoryComponent {
    public searchValue = '';
    public visible!: boolean;
    public listOfDisplayData: ItemData[] = this.datasetService.tables;

    public constructor(public modalService: ModalService, public datasetService: DatasetService) {
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
            (item: ItemData) => item._tableName.indexOf(this.searchValue) !== -1
        );
    }

    public getDownloadUrl(fileName: string, fileFormat: string): string {
        return `${API_DOWNLOAD_FILE}?tableName=${fileName}&fileFormat=${fileFormat}`;
    }

    public deleteRow(name: string): void {
        this.datasetService.deleteTable(name);
        this.datasetService.tables = this.datasetService.tables.filter((d: ItemData) => d._tableName !== name);
    }
}
