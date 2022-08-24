import {Component} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzUploadChangeParam} from 'ng-zorro-antd/upload';

@Component({
    selector: 'app-input',
    templateUrl: './upload-input.component.html',
    styleUrls: ['./upload-input.component.scss'],
})
export class UploadInputComponent {
    public constructor(private msg: NzMessageService) {}

    public uploadH = {
        accept: 'text/plain',
    };
    public handleChange({file, fileList}: NzUploadChangeParam): void {
        const status = file.status;

        if (status !== 'uploading') {
            console.log(file, fileList);
        }
        if (status === 'done') {
            this.msg.success(`${file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            this.msg.error(`${file.name} file upload failed.`);
        }
    }
}
