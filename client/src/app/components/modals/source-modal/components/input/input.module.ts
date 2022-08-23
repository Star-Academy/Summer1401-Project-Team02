import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InputComponent} from './input.component';
import {NzUploadModule} from 'ng-zorro-antd/upload';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzMessageService} from 'ng-zorro-antd/message';

@NgModule({
    declarations: [InputComponent],
    imports: [CommonModule, NzUploadModule, NzIconModule],
    providers: [{provide: NzMessageService}],
    exports: [InputComponent],
})
export class InputModule {}
