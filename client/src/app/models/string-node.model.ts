import {StringsFunction} from '../enums/string-function';
import {NodeModel} from './node.model';

export interface StringNodeModel extends NodeModel {
    function: StringsFunction;
    newColumn: boolean;
    columnName: string;
    second: string;
}
