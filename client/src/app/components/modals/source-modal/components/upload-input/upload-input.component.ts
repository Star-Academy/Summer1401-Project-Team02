import {Component} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzUploadChangeParam} from 'ng-zorro-antd/upload';
import {PipelineService} from '../../../../../services/pipeline/pipeline.service';
import {SourceNodeModel} from '../../../../../models/source-node.model';
import {DatasetService} from '../../../../../services/dataset/dataset.service';
import {log} from 'ng-zorro-antd/core/logger';
import {CanvasService} from '../../../../../services/canvas/canvas.service';

@Component({
    selector: 'app-upload-input',
    templateUrl: './upload-input.component.html',
    styleUrls: ['./upload-input.component.scss'],
})
export class UploadInputComponent {
    private n: number = 1;
    public constructor(
        private msg: NzMessageService,
        public datasetService: DatasetService,
        private pipelineService: PipelineService,
        private canvasService: CanvasService
    ) {}

    public uploadH = {
        accept: 'text/plain',
    };
    public async handleChange({file}: NzUploadChangeParam): Promise<void> {
        const status = file.status;

        //TODO ??
        if (status === 'uploading') {
            if (this.n === 1) {
                this.msg.loading(`Uploading ${file.name}...`);
                this.n++;
            }
        }
        if (status === 'done') {
            this.msg.success(`${file.name} file uploaded successfully.`);
            const sourceNode = this.pipelineService.getSelectedNode() as SourceNodeModel;
            if (sourceNode) {
                sourceNode._tableId = file.response.tableId;
                this.canvasService.changeSrcAndDestIcon(sourceNode.id, true);

                this.pipelineService.editNode(sourceNode);
                await this.pipelineService.preview();
            } else await this.datasetService.getTables();
        } else if (status === 'error') {
            this.msg.error(`${file.name} file upload failed.`);
        }
    }
}
