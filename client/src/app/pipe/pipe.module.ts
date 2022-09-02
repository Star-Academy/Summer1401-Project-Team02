import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PreviewKeyPipe} from './preview-key/preview-key.pipe';
import {PreviewValuePipe} from './preview-value/preview-value.pipe';
import {SideTypePipe} from './side-type/side-type.pipe';
import {SidebarHeaderPipe} from './sidebar-header/sidebar-header.pipe';
import {DateAndTimePipe} from './dataset-date/dateAndTime.pipe';

@NgModule({
    declarations: [PreviewKeyPipe, PreviewValuePipe, SideTypePipe, SidebarHeaderPipe, DateAndTimePipe],
    imports: [CommonModule],
    exports: [PreviewKeyPipe, PreviewValuePipe, SideTypePipe, SidebarHeaderPipe, DateAndTimePipe],
})
export class PipeModule {}
