import {ColumnFilteringOperation} from '../enums/column-filtering-operator';
import {NodeModel} from './node.model';

export interface FilterNodeModel extends NodeModel {
    data: {
        _columnName: string;
        _operator: ColumnFilteringOperation;
        value: string;
    };
}
