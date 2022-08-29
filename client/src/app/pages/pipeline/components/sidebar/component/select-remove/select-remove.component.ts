import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../../../../../services/api/api.service';
import {PipelineService} from '../../../../../../services/pipeline/pipeline.service';

@Component({
    selector: 'app-select-remove',
    templateUrl: './select-remove.component.html',
    styleUrls: ['./select-remove.component.scss'],
})
export class SelectRemoveComponent implements OnInit {
    public isLoading = false;
    public isSelect = 'Select';
    public columns = [];

    public constructor(private pipelineService: PipelineService) {}

    public async ngOnInit(): Promise<void> {
        await this.pipelineService.getColumnsHeader();
    }
}
