import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'dateAndTime',
})
export class DateAndTimePipe implements PipeTransform {
    public transform(value: string): string {
        return value.replace('T', ' ');
    }
}
