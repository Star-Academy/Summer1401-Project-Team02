import {Injectable} from '@angular/core';
import {DestinationNodeModel} from '../../models/destination-node.model';
import {SourceNodeModel} from '../../models/source-node.model';
import {ColumnSelectorNodeModel} from '../../models/column-selector-node.model';
import {NodeType} from '../../enums/node-type';
import {ApiService} from '../api/api.service';
import {API_EXECUTE, API_GET_COLUMNS_HEADING, API_PREVIEW} from '../../utils/api.utils';

type PipelineNodeModel = DestinationNodeModel | SourceNodeModel | ColumnSelectorNodeModel;

@Injectable({
    providedIn: 'root',
})
export class PipelineService {
    public nodes: PipelineNodeModel[] = [];

    public lastExecuteResult: any | null = null;
    public previewContent: any | null = null;

    public selectedPreviousNode: string = '';
    public selectedNextNode: string = '';
    public selectedIdNode: string = '';
    public selectedTypeNode: NodeType = -1;

    public constructor(private apiService: ApiService) {}

    public creatNode(nodeType: NodeType): SourceNodeModel | ColumnSelectorNodeModel | void {
        if (nodeType === NodeType.SourceNode) {
            return {
                _NodeType: NodeType.SourceNode,
                _previousNode: '',
                _tableName: '',
                id: Math.random().toString(),
            };
        } else if (nodeType === NodeType.Selector) {
            return {
                _NodeType: NodeType.Selector,
                _previousNode: this.selectedPreviousNode,
                _columns: [],
                id: Math.random().toString(),
            };
        } else if (nodeType === NodeType.DestinationNode) {
            return {
                _NodeType: NodeType.DestinationNode,
                _previousNode: this.selectedPreviousNode,
                _tableName: '',
                id: Math.random().toString(),
            };
        }
    }

    public addNode(nodeType: NodeType): void {
        const node = this.creatNode(nodeType);
        if (!node) return;
        this.nodes.forEach((n) => {
            if (n.id === this.selectedNextNode) n._previousNode = node.id;
        });
        this.selectedIdNode = node.id;
        this.selectedTypeNode = node._NodeType;
        this.nodes.unshift(node);
    }

    public removeNode(id: string): void {
        this.nodes = this.nodes.filter((node) => node.id !== id);
    }

    public editNode(data: PipelineNodeModel): void {
        this.nodes.forEach((node, index) => {
            if (node.id === this.selectedIdNode) {
                this.nodes[index] = {...data};
                return;
            }
        });
    }

    public getSelectedNode(): PipelineNodeModel | undefined {
        return this.nodes.find((node) => node.id === this.selectedIdNode);
    }

    public async getColumnsHeader(): Promise<string[]> {
        const requestUrl = `${API_GET_COLUMNS_HEADING}?pipelineJson=${this.convertToDictionary()}&id=${
            this.selectedIdNode
        }`;
        const response = await this.apiService.getRequest<string[]>({url: requestUrl});

        if (response) return JSON.parse(response);
        else return [];
    }

    public async execute(): Promise<void> {
        const response = await this.apiService.postRequest({url: API_EXECUTE, body: this.convertToDictionary()});

        if (response) this.lastExecuteResult = JSON.parse(response);
        else this.lastExecuteResult = null;
    }

    public async preview(): Promise<void> {
        const requestUrl = `${API_PREVIEW}?pipelineJson=${this.convertToDictionary()}&id=${this.selectedIdNode}`;
        const response = await this.apiService.getRequest<string>({url: requestUrl});

        if (response) this.previewContent = JSON.parse(response);
    }

    private convertToDictionary(): string {
        const dictionary: any = {};

        for (const node of this.nodes) {
            dictionary[node.id] = node;
        }

        return JSON.stringify({Nodes: dictionary});
    }
}
