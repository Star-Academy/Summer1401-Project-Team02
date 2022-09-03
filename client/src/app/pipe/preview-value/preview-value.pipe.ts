import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'previewValue',
})
export class PreviewValuePipe implements PipeTransform {
    public transform(value: any): any[] {
        const table: any[] = [];
        value.forEach((obj: any) => {
            table.push(Object.values(obj));
        });
        return table;
    }
}
