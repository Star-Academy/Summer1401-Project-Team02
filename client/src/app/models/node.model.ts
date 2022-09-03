import {NodeType} from '../enums/node-type';
import {FilterNodeModel} from './filter-node.model';
import {ColumnSelectorNodeModel} from './column-selector-node.model';

export interface NodeModel {
    id: string;
    _NodeType: NodeType;
    _previousNode?: string;
}
