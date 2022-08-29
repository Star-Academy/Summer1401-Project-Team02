import {Component} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzUploadChangeParam} from 'ng-zorro-antd/upload';
import {PipelineService} from '../../../../../services/pipeline/pipeline.service';
import {SourceNodeModel} from '../../../../../models/source-node.model';

@Component({
    selector: 'app-upload-input',
    templateUrl: './upload-input.component.html',
    styleUrls: ['./upload-input.component.scss'],
})
export class UploadInputComponent {
    public constructor(private msg: NzMessageService, private pipelineService: PipelineService) {}

    public uploadH = {
        accept: 'text/plain',
    };
    public handleChange({file}: NzUploadChangeParam): void {
        const status = file.status;

        if (status !== 'uploading') {
            const sourceNode = this.pipelineService.getSelectedNode() as SourceNodeModel;
            sourceNode._tableName = file.response.tableName;

            this.pipelineService.editNode(sourceNode);
        }
        if (status === 'done') {
            this.msg.success(`${file.name} file uploaded successfully.`);
            this.pipelineService.preview();
        } else if (status === 'error') {
            this.msg.error(`${file.name} file upload failed.`);
        }
    }
}
