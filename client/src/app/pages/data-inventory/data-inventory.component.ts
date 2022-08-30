import {Component, OnInit} from '@angular/core';
import {ModalService} from '../../services/modal/modal.service';
import {DatasetService} from '../../services/dataset/dataset.service';
import {API_DOWNLOAD_FILE} from '../../utils/api.utils';
interface ItemData {
    tableName: string;
    dateAndTime: string;
}
@Component({
    selector: 'app-data-inventory',
    templateUrl: './data-inventory.component.html',
    styleUrls: ['./data-inventory.component.scss'],
})
export class DataInventoryComponent {
    public searchValue = '';
    public i = 0;
    public visible!: boolean;
    public listOfDisplayData!: ItemData[];

    public constructor(public modalService: ModalService, public datasetService: DatasetService) {
        this.datasetService.getTables();
    }

    public reset(): void {
        this.searchValue = '';
        this.search();
    }
    public search(): void {
        this.visible = false;
        this.listOfDisplayData = this.datasetService.tables.filter(
            (item: ItemData) => item.tableName.indexOf(this.searchValue) !== -1
        );
    }

    public getDownloadUrl(fileName: string, fileFormat: string): string {
        return `${API_DOWNLOAD_FILE}?tableName=${fileName}&fileFormat=${fileFormat}`;
    }
}
