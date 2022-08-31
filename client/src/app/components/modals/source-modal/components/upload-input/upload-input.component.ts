import {Component} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzUploadChangeParam} from 'ng-zorro-antd/upload';
import {PipelineService} from '../../../../../services/pipeline/pipeline.service';
import {SourceNodeModel} from '../../../../../models/source-node.model';
import {DatasetService} from '../../../../../services/dataset/dataset.service';
import {log} from 'ng-zorro-antd/core/logger';

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
        private pipelineService: PipelineService
    ) {}

    public uploadH = {
        accept: 'text/plain',
    };
    public handleChange({file}: NzUploadChangeParam): void {
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
            console.log(file);
            if (sourceNode) {
                sourceNode._tableID = file.response.tableID;

                this.pipelineService.editNode(sourceNode);
                this.pipelineService.preview();
            } else this.datasetService.getTables();
        } else if (status === 'error') {
            this.msg.error(`${file.name} file upload failed.`);
        }
    }
}
