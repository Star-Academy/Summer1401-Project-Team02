import {Injectable} from '@angular/core';
import {JoinNodeModel} from '../../models/join-node.model';
import {JoinMode} from '../../enums/join-mode';
import {PipelineService} from '../pipeline/pipeline.service';

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
        debugger;
        this.selectNode._secondPreviousNode = tableId;

        this.sourceColumns = await this.pipelineService.getColumnsHeader();
        this.secondaryColumns = await this.pipelineService.getSecondaryNodeColumnHeader(tableId);
    }

    public emit(): JoinNodeModel {
        return this.selectNode;
    }
}
