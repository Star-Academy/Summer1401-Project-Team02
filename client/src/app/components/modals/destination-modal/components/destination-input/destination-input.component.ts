import {Component} from '@angular/core';
import {DatasetService} from '../../../../../services/api/dataset.service';
import {FileModal} from '../../../../../models/file.modal';
import {MessageService} from '../../../../../services/message.service';

@Component({
    selector: 'app-destination-input',
    templateUrl: './destination-input.component.html',
    styleUrls: ['./destination-input.component.scss'],
})
export class DestinationInputComponent {
    public file: FileModal = {
        tableName: '',
    };

    public constructor(public datasetService: DatasetService, public messageService: MessageService) {}

    public async submitForm(): Promise<void> {
        const response = await this.datasetService.sendDestination(this.file);
        if (response) this.messageService.show('success');
        else if (!response) this.messageService.show('error');
    }
}