import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PipelineComponent} from './pipeline.component';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {ModalModule} from '../../components/modal/modal.module';

@NgModule({
    declarations: [PipelineComponent],
    imports: [CommonModule, NzButtonModule, ModalModule],
})
export class PipelineModule {}
