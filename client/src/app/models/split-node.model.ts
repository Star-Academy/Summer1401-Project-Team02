import {NodeModel} from './node.model';

export interface SplitNodeModel extends NodeModel {
    _columnName: string;
    _delimeter: string;
    _numberOfParts: number;
    replace: boolean;
}
