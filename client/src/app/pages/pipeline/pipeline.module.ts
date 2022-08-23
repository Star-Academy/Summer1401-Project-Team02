import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PipelineComponent} from './pipeline.component';
import {NzButtonModule} from 'ng-zorro-antd/button';

@NgModule({
    declarations: [PipelineComponent],
    imports: [CommonModule, NzButtonModule],
})
export class PipelineModule {}
