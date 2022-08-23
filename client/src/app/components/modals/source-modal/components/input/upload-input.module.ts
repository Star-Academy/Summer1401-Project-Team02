import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UploadInputComponent} from './upload-input.component';
import {NzUploadModule} from 'ng-zorro-antd/upload';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzMessageService} from 'ng-zorro-antd/message';

@NgModule({
    declarations: [UploadInputComponent],
    imports: [CommonModule, NzUploadModule, NzIconModule],
    providers: [{provide: NzMessageService}],
    exports: [UploadInputComponent],
})
export class UploadInputModule {}
