import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ModalComponent} from './modal.component';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {InputModule} from '../input/input.module';
import {DestinationInputComponent} from './components/destination-input/destination-input.component';
import {FormsModule} from '@angular/forms';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzFormModule} from 'ng-zorro-antd/form';

@NgModule({
    declarations: [ModalComponent, DestinationInputComponent],
    exports: [ModalComponent],
    imports: [CommonModule, NzModalModule, NzButtonModule, InputModule, FormsModule, NzInputModule, NzFormModule],
})
export class ModalModule {}
