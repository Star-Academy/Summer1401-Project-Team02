import {Component} from '@angular/core';
import {DatasetService} from '../../../../../services/dataset/dataset.service';
import {FileModal} from '../../../../../models/file.modal';
import {NzMessageService} from 'ng-zorro-antd/message';
import {PipelineService} from '../../../../../services/pipeline/pipeline.service';
import {SourceNodeModel} from '../../../../../models/source-node.model';
import {DestinationNodeModel} from '../../../../../models/destination-node.model';

@Component({
    selector: 'app-destination-input',
    templateUrl: './destination-input.component.html',
    styleUrls: ['./destination-input.component.scss'],
})
export class DestinationInputComponent {
    public file: FileModal = {
        tableName: '',
    };

    public constructor(
        public datasetService: DatasetService,
        public messageService: NzMessageService,
        private pipelineService: PipelineService
    ) {}

    public async submitForm(): Promise<void> {
        const response = await this.datasetService.sendDestination(this.file);
        if (response) {
            this.messageService.create('success', 'success');
            const destinationNode = this.pipelineService.getSelectedNode() as DestinationNodeModel;
            destinationNode._tableName = response.tableName;

            this.pipelineService.editNode(destinationNode);
        } else if (!response) this.messageService.create('error', 'error');
    }
}
