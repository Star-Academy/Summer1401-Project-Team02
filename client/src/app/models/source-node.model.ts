import {NodeModel} from './node.model';

export interface SourceNodeModel extends NodeModel {
    data: {
        tableName: string;
    };
}
