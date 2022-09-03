import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DestinationModalComponent} from './destination-modal.component';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {DestinationInputComponent} from './components/destination-input/destination-input.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzTabsModule} from 'ng-zorro-antd/tabs';
import {ConnectionModule} from '../../connection/connection.module';
import {SourceModalModule} from '../source-modal/source-modal.module';

@NgModule({
    declarations: [DestinationModalComponent, DestinationInputComponent],
    imports: [
        CommonModule,
        NzModalModule,
        NzButtonModule,
        FormsModule,
        NzInputModule,
        ReactiveFormsModule,
        NzFormModule,
        NzTabsModule,
        ConnectionModule,
        SourceModalModule,
    ],
    exports: [DestinationModalComponent, DestinationInputComponent],
})
export class DestinationModalModule {}
