import {NodeModel} from './node.model';

export interface ColumnSelectorNodeModel extends NodeModel {
    _columns: string[];
}
