import {Component} from '@angular/core';
import {DatasetService} from '../../../../../services/dataset/dataset.service';
import {FileModal} from '../../../../../models/file.modal';
import {NzMessageService} from 'ng-zorro-antd/message';

@Component({
    selector: 'app-destination-input',
    templateUrl: './destination-input.component.html',
    styleUrls: ['./destination-input.component.scss'],
})
export class DestinationInputComponent {
    public file: FileModal = {
        tableName: '',
    };

    public constructor(public datasetService: DatasetService, public messageService: NzMessageService) {}

    public async submitForm(): Promise<void> {
        const response = await this.datasetService.sendDestination(this.file);
        if (response) this.messageService.create('success', 'success');
        else if (!response) this.messageService.create('error', 'error');
    }
}
