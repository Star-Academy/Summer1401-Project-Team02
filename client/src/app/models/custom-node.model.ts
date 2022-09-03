import {NodeModel} from './node.model';

export interface CustomNodeModel extends NodeModel {
    _first: string;
    _second: string;
}
