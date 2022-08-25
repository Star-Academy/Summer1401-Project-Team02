import {NodeModel} from './node.model';

export interface ColumnSelectorNodeModel extends NodeModel {
    data: {
        _columnNames: string[];
    };
}
