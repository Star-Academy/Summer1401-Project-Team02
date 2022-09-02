import {Injectable} from '@angular/core';
import {JoinNodeModel} from '../../models/join-node.model';
import {JoinMode} from '../../enums/join-mode';
import {PipelineService} from '../pipeline/pipeline.service';
import {NodeType} from '../../enums/node-type';

@Injectable({
    providedIn: 'root',
})
export class JoinService {
    public isLoading = false;

    public selectNode!: JoinNodeModel;

    public sourceColumns: string[] = [];
    public secondaryColumns: string[] = [];
    public joinModes = ['Inner', 'Left', 'Right', 'Full'];

    public constructor(private pipelineService: PipelineService) {}

    public async setTableId(tableId: string): Promise<void> {
        const secondaryId = this.addSecondaryNode(tableId);

        this.sourceColumns = await this.pipelineService.getColumnsHeader();
        this.secondaryColumns = await this.pipelineService.getSecondaryNodeColumnHeader(secondaryId);
    }

    public addSecondaryNode(tableId: string): string {
        const secondaryNode = {
            _NodeType: NodeType.SourceNode,
            _previousNode: '',
            _tableId: tableId,
            id: Math.random().toString(),
        };

        this.selectNode._secondPreviousNode = secondaryNode.id;
        this.pipelineService.nodes.push(secondaryNode);

        return secondaryNode.id;
    }

    public emit(): JoinNodeModel {
        return this.selectNode;
    }
}
