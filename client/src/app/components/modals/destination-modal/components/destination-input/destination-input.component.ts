import {Component} from '@angular/core';
import {DatasetService} from '../../../../../services/api/dataset.service';
import {FileModal} from '../../../../../models/file.modal';

@Component({
    selector: 'app-destination-input',
    templateUrl: './destination-input.component.html',
    styleUrls: ['./destination-input.component.scss'],
})
export class DestinationInputComponent {
    public file: FileModal = {
        tableName: '',
    };
    public constructor(public datasetService: DatasetService) {}

    public async submitForm(): Promise<void> {
        console.log(typeof this.file.tableName);
        await this.datasetService.sendDestination(this.file);
    }
}
