import {Pipe, PipeTransform} from '@angular/core';
import {NodeType} from '../../enums/node-type';

@Pipe({
    name: 'sideType',
})
export class SideTypePipe implements PipeTransform {
    public transform(typeNode: number, index: number): boolean {
        let value = 0;
        switch (typeNode) {
            case NodeType.Selector:
                value = 1;
                break;
            case NodeType.Custom:
                value = 2;
                break;
            case NodeType.Split:
                value = 3;
                break;
            case NodeType.Math:
                value = 4;
                break;
            case NodeType.Aggregate:
                value = 5;
                break;
            case NodeType.Filter:
                value = 6;
                break;
            default:
                value = 0;
        }

        return value === index;
    }
}
