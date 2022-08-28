import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DataInventoryComponent} from './data-inventory.component';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzTableModule} from 'ng-zorro-antd/table';
import {NzDropDownModule} from 'ng-zorro-antd/dropdown';
import {NzInputModule} from 'ng-zorro-antd/input';
import {FormsModule} from '@angular/forms';
import {NzPopconfirmModule} from 'ng-zorro-antd/popconfirm';
import {HeaderModule} from '../../components/header/header.module';

@NgModule({
    declarations: [DataInventoryComponent],
    imports: [
        CommonModule,
        NzButtonModule,
        NzIconModule,
        NzTableModule,
        NzDropDownModule,
        NzInputModule,
        FormsModule,
        NzPopconfirmModule,
        HeaderModule,
    ],
})
export class DataInventoryModule {}
