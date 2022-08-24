import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {Graph} from '@antv/x6';
import {canvas} from '../../utils/canvas.utils';
import {CanvasService} from '../../services/canvas.service';

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
        const source = this.canvasService.graph.addNode({
            shape: 'cylinder',
            x: 220,
            y: 120,
            width: 80,
            height: 120,
            label: 'Source',
            aref: 'ssss',
            attrs: {
                top: {
                    fill: '#fe854f',
                    fillOpacity: 0.5,
                },
                body: {
                    fill: '#ED8A19',
                    fillOpacity: 0.8,
                },
            },
        });

        const target = this.canvasService.graph.addNode({
            shape: 'cylinder',
            x: 420,
            y: 120,
            width: 80,
            height: 120,
            label: 'Dest',
            attrs: {
                top: {
                    fill: '#fe854f',
                    fillOpacity: 0.5,
                },
                body: {
                    fill: '#ED8A19',
                    fillOpacity: 0.8,
                },
            },
        });

        const edge = this.canvasService.graph.addEdge({
            shape: 'org-edge',
            source,
            target,
        });
        console.log(edge);

        // this.canvasService.graph.on('node:click', ({e, x, y, node, view}) => {});

        this.canvasService.graph.on('node:mouseenter', ({node}) => {
            if (node !== target) {
                node.addTools({
                    name: 'button-remove',
                    args: {
                        x: 0,
                        y: 0,
                        offset: {x: 10, y: 10},
                    },
                });
            }
        });

        this.canvasService.graph.on('node:mouseleave', ({node}) => {
            if (node !== target) {
                node.removeTools();
            }
        });
    }
}
