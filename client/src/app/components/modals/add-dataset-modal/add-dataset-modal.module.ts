import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddDatasetModalComponent} from './add-dataset-modal.component';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {NzTabsModule} from 'ng-zorro-antd/tabs';
import {UploadInputModule} from '../source-modal/components/upload-input/upload-input.module';
import {DestinationModalModule} from '../destination-modal/destination-modal.module';
import {NzButtonModule} from 'ng-zorro-antd/button';

@NgModule({
    declarations: [AddDatasetModalComponent],
    imports: [CommonModule, NzModalModule, NzTabsModule, UploadInputModule, DestinationModalModule, NzButtonModule],
    exports: [AddDatasetModalComponent],
})
export class AddDatasetModalModule {}
