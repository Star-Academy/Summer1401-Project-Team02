import {NodeModel} from './node.model';

export interface SourceNodeModel extends NodeModel {
    tableName: string;
}
