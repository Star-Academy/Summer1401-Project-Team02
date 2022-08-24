import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {Graph} from '@antv/x6';
import {canvas} from '../../../../utils/canvas.utils';
import {CanvasService} from '../../../../services/canvas.service';

@Component({
    selector: 'app-canvas',
    templateUrl: './canvas.component.html',
    styleUrls: ['./canvas.component.scss'],
})
export class CanvasComponent implements AfterViewInit {
    @ViewChild('pipeLineContainer') pipeLineContainer!: ElementRef<HTMLDivElement>;

    public constructor(private canvasService: CanvasService) {
        this.canvasService.initComponent(this);
    }

    public ngAfterViewInit(): void {
        const doc = this.pipeLineContainer.nativeElement;
        this.canvasService.graphSetting(doc);
        // function clipBoard(): void {
        //     graph.bindKey('ctrl+c', () => {
        //         const cells = graph.getSelectedCells();
        //         if (cells.length) {
        //             graph.copy(cells);
        //         }
        //     });
        //
        //     graph.bindKey('ctrl+v', () => {
        //         if (!graph.isClipboardEmpty()) {
        //             const cells = graph.paste({offset: 32});
        //             graph.cleanSelection();
        //             graph.select(cells);
        //         }
        //     });
        // }

        ///////////////////////////////
    }
}
