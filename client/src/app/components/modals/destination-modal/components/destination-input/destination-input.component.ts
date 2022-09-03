import {Component} from '@angular/core';
import {DatasetService} from '../../../../../services/dataset/dataset.service';
import {FileModal} from '../../../../../models/file.modal';
import {NzMessageService} from 'ng-zorro-antd/message';
import {PipelineService} from '../../../../../services/pipeline/pipeline.service';
import {SourceNodeModel} from '../../../../../models/source-node.model';
import {DestinationNodeModel} from '../../../../../models/destination-node.model';
import {CanvasService} from '../../../../../services/canvas/canvas.service';

@Component({
    selector: 'app-destination-input',
    templateUrl: './destination-input.component.html',
    styleUrls: ['./destination-input.component.scss'],
})
export class DestinationInputComponent {
    public file: FileModal = {
        tableId: '',
        tableName: '',
    };

    public constructor(
        public datasetService: DatasetService,
        public messageService: NzMessageService,
        private pipelineService: PipelineService,
        private canvasService: CanvasService
    ) {}

    public async submitForm(): Promise<void> {
        const response = await this.datasetService.sendDestination(this.file);
        if (response) {
            this.messageService.create('success', 'success');
            await this.datasetService.getTables();
            const destinationNode = this.pipelineService.getSelectedNode() as DestinationNodeModel;
            destinationNode._tableId = response.tableId;
            this.canvasService.changeSrcAndDestIcon(destinationNode.id, true);

            this.pipelineService.editNode(destinationNode);
        } else if (!response) this.messageService.create('error', 'error');
    }
}
