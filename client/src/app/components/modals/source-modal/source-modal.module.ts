import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SourceModalComponent} from './source-modal.component';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzUploadModule} from 'ng-zorro-antd/upload';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {UploadInputModule} from './components/upload-input/upload-input.module';
import {NzTabsModule} from 'ng-zorro-antd/tabs';
import {ConnectionModule} from '../../connection/connection.module';

@NgModule({
    declarations: [SourceModalComponent],
    imports: [
        CommonModule,
        NzModalModule,
        NzButtonModule,
        NzUploadModule,
        NzIconModule,
        UploadInputModule,
        NzTabsModule,
        ConnectionModule,
    ],
    exports: [SourceModalComponent],
})
export class SourceModalModule {}
