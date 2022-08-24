import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MessageComponent} from './message.component';
import {NzButtonModule} from 'ng-zorro-antd/button';

@NgModule({
    declarations: [MessageComponent],
    imports: [CommonModule, NzButtonModule],
    exports: [MessageComponent],
})
export class MessageModule {}
