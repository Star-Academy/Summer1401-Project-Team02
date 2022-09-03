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
import {SourceTableComponent} from './components/source-table/source-table.component';
import {NzTableModule} from 'ng-zorro-antd/table';
import {NzDropDownModule} from 'ng-zorro-antd/dropdown';
import {NzPopconfirmModule} from 'ng-zorro-antd/popconfirm';
import {FormsModule} from '@angular/forms';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzCheckboxModule} from 'ng-zorro-antd/checkbox';
import {PipeModule} from '../../../pipe/pipe.module';

@NgModule({
    declarations: [SourceModalComponent, SourceTableComponent],
    imports: [
        CommonModule,
        NzModalModule,
        NzButtonModule,
        NzUploadModule,
        NzIconModule,
        UploadInputModule,
        NzTabsModule,
        ConnectionModule,
        NzTableModule,
        NzDropDownModule,
        NzPopconfirmModule,
        FormsModule,
        NzInputModule,
        NzCheckboxModule,
        PipeModule,
    ],
    exports: [SourceModalComponent, SourceTableComponent],
})
export class SourceModalModule {}
