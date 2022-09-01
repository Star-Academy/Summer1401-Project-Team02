import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PreviewKeyPipe} from './preview-key/preview-key.pipe';
import {PreviewValuePipe} from './preview-value/preview-value.pipe';

@NgModule({
    declarations: [PreviewKeyPipe, PreviewValuePipe],
    imports: [CommonModule],
    exports: [PreviewKeyPipe, PreviewValuePipe],
})
export class PipeModule {}
