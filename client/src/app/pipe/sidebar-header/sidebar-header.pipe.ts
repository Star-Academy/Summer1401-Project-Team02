import {Pipe, PipeTransform} from '@angular/core';
import {NodeType} from '../../enums/node-type';

@Pipe({
    name: 'sidebarHeader',
})
export class SidebarHeaderPipe implements PipeTransform {
    public transform(typeNode: number): string {
        switch (typeNode) {
            case NodeType.Selector:
                return 'Selector Process';
            case NodeType.Custom:
                return 'custom Process';
            case NodeType.Split:
                return 'Split Process';
            case NodeType.Math:
                return 'Math Process';
            case NodeType.Aggregate:
                return 'Aggregate Process';
            case NodeType.Filter:
                return 'Filter Process';
            case NodeType.Join:
                return 'Join process';
            default:
                return 'Process Config';
        }
    }
}
