import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PreviewKeyPipe} from './preview-key/preview-key.pipe';
import {PreviewValuePipe} from './preview-value/preview-value.pipe';
import {SideTypePipe} from './side-type/side-type.pipe';
import {SidebarHeaderPipe} from './sidebar-header/sidebar-header.pipe';

@NgModule({
    declarations: [PreviewKeyPipe, PreviewValuePipe, SideTypePipe, SidebarHeaderPipe],
    imports: [CommonModule],
    exports: [PreviewKeyPipe, PreviewValuePipe, SideTypePipe, SidebarHeaderPipe],
})
export class PipeModule {}
