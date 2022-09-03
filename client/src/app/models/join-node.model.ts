import {NodeModel} from './node.model';
import {JoinMode} from '../enums/join-mode';

export interface JoinNodeModel extends NodeModel {
    _secondaryColumn: string;
    _primaryColumn: string;
    _secondPreviousNode: string;
    _joinMode: JoinMode;
}
