import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProcessModalComponent} from './process-modal.component';
import {NzGridModule} from 'ng-zorro-antd/grid';
import {NzCardModule} from 'ng-zorro-antd/card';
import {ProcessMenuComponent} from './components/process-menu/process-menu.component';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {CardComponent} from './components/process-menu/components/card/card.component';
import {NzIconModule} from 'ng-zorro-antd/icon';

@NgModule({
    declarations: [ProcessModalComponent, ProcessMenuComponent, CardComponent],
    imports: [CommonModule, NzGridModule, NzCardModule, NzModalModule, NzButtonModule, NzIconModule],
    exports: [ProcessModalComponent],
})
export class ProcessModalModule {}
