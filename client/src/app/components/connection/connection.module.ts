import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConnectionComponent} from './connection.component';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {FormsModule} from '@angular/forms';

@NgModule({
    declarations: [ConnectionComponent],
    imports: [CommonModule, NzFormModule, NzInputModule, NzButtonModule, FormsModule],
    exports: [ConnectionComponent],
})
export class ConnectionModule {}
