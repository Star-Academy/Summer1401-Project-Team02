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
import {NzTableModule} from 'ng-zorro-antd/table';
import {HeaderModule} from '../../components/header/header.module';
import {DefaultComponent} from './components/sidebar/component/default/default.component';
import {SelectRemoveComponent} from './components/sidebar/component/select-remove/select-remove.component';
import {NzSelectModule} from 'ng-zorro-antd/select';
import {CustomComponent} from './components/sidebar/component/custom/custom.component';
import {MathComponent} from './components/sidebar/component/math/math.component';
import {SplitComponent} from './components/sidebar/component/split/split.component';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzInputNumberModule} from 'ng-zorro-antd/input-number';
import {NzSwitchModule} from 'ng-zorro-antd/switch';
import {AggregateComponent} from './components/sidebar/component/aggregate/aggregate.component';
import {PipeModule} from '../../pipe/pipe.module';
import { FilterComponent } from './components/sidebar/component/filter/filter.component';

@NgModule({
    declarations: [
        PipelineComponent,
        CanvasComponent,
        SidebarComponent,
        PreviewComponent,
        DefaultComponent,
        SelectRemoveComponent,
        CustomComponent,
        MathComponent,
        SplitComponent,
        AggregateComponent,
        FilterComponent,
    ],
    imports: [
        CommonModule,
        NzButtonModule,
        DestinationModalModule,
        ProcessModalModule,
        NzIconModule,
        FormsModule,
        NzTableModule,
        HeaderModule,
        NzSelectModule,
        NzInputModule,
        NzInputNumberModule,
        NzSwitchModule,
        PipeModule,
    ],
})
export class PipelineModule {}
