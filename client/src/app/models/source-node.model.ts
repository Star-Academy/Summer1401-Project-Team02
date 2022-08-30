import {NodeModel} from './node.model';

export interface SourceNodeModel extends NodeModel {
    _tableName: string;
}
