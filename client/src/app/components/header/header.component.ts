import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {PipelineService} from '../../services/pipeline/pipeline.service';
import {CanvasService} from '../../services/canvas/canvas.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
    public dropDownText: string;

    public isInPipeline: boolean = true;
    public title: string;
    public executeLoading = false;

    public constructor(
        private router: Router,
        private pipelineService: PipelineService,
        private canvasService: CanvasService
    ) {
        if (this.router.url === '/data-inventory') this.isInPipeline = false;
        this.title = this.isInPipeline ? 'Pipeline' : 'Data inventory';
        this.dropDownText = this.isInPipeline ? 'Pipeline' : 'Data inventory';
    }

    public async onBack(): Promise<void> {
        await this.router.navigateByUrl('/');
    }

    public async execute(): Promise<void> {
        this.executeLoading = true;
        this.canvasService.running(this.executeLoading);
        setTimeout(async () => {
            await this.pipelineService.execute();
            this.executeLoading = false;
            this.canvasService.running(this.executeLoading);
        }, 2000);
    }
}
