import {NodeModel} from './node.model';
import {ColumnSelectorNodeModel} from './column-selector-node.model';
import {FilterNodeModel} from './filter-node.model';

export interface DestinationNodeModel extends NodeModel {
    data: {tableName: string};
}
