import {AggregateFunction} from '../enums/aggregate-function';
import {NodeModel} from './node.model';

export interface AggregateNodeModel extends NodeModel {
    _functions: {Item1: AggregateFunction; Item2: string; Item3: string}[];
    _groupingColumns: string[];
}
