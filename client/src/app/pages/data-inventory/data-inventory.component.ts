import {Component, OnInit} from '@angular/core';
import {ModalService} from '../../services/modal/modal.service';
import {DatasetService} from '../../services/dataset/dataset.service';
interface ItemData {
    id: string;
    name: string;
    age: string;
    address: string;
}
@Component({
    selector: 'app-data-inventory',
    templateUrl: './data-inventory.component.html',
    styleUrls: ['./data-inventory.component.scss'],
})
export class DataInventoryComponent implements OnInit {
    public searchValue = '';
    public i = 0;
    public editId: string | null = null;
    public listOfData: ItemData[] = [];
    public visible!: boolean;
    public listOfDisplayData!: ItemData[];

    public constructor(public modalService: ModalService, public datasetService: DatasetService) {}

    public startEdit(id: string): void {
        this.editId = id;
    }

    public stopEdit(): void {
        this.editId = null;
    }

    public addRow(): void {
        this.listOfData = [
            ...this.listOfData,
            {
                id: `${this.i}`,
                name: `Diba ${this.i}`,
                age: '21',
                address: `London, Park Lane no. ${this.i}`,
            },
        ];
        this.listOfDisplayData = this.listOfData;
        this.i++;
    }

    public deleteRow(id: string): void {
        this.listOfData = this.listOfData.filter((d) => d.id !== id);
        this.listOfDisplayData = this.listOfData;
    }

    public ngOnInit(): void {
        this.addRow();
        this.addRow();
    }
    public reset(): void {
        this.searchValue = '';
        this.search();
    }
    public search(): void {
        this.visible = false;
        this.listOfDisplayData = this.listOfData.filter((item: ItemData) => item.name.indexOf(this.searchValue) !== -1);
    }
}
