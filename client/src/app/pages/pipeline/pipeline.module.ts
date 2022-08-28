import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PipelineComponent} from './pipeline.component';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {DestinationModalModule} from '../../components/modals/destination-modal/destination-modal.module';
import {ProcessModalModule} from '../../components/modals/process-modal/process-modal.module';
import {CanvasComponent} from './components/canvas/canvas.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {PreviewComponent} from './components/preview/preview.component';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {FormsModule} from '@angular/forms';
import {HeaderModule} from '../../components/header/header.module';

@NgModule({
    declarations: [PipelineComponent, CanvasComponent, SidebarComponent, PreviewComponent],
    imports: [
        CommonModule,
        NzButtonModule,
        DestinationModalModule,
        ProcessModalModule,
        NzIconModule,
        FormsModule,
        HeaderModule,
    ],
})
export class PipelineModule {}
