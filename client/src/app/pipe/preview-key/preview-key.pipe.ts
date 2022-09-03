import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'previewKey',
})
export class PreviewKeyPipe implements PipeTransform {
    public transform(value: any): string[] {
        return Object.keys(value[0]);
    }
}
