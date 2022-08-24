import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PipelineComponent} from './pipeline.component';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {DestinationModalModule} from '../../components/modals/destination-modal/destination-modal.module';
import {ProcessModalModule} from '../../components/modals/process-modal/process-modal.module';

@NgModule({
    declarations: [PipelineComponent],
    imports: [CommonModule, NzButtonModule, DestinationModalModule, ProcessModalModule],
})
export class PipelineModule {}
