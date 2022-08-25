import {Injectable} from '@angular/core';
import {Graph} from '@antv/x6';
import {CanvasComponent} from '../../pages/pipeline/components/canvas/canvas.component';
import {ModalService} from '../modal/modal.service';

@Injectable({
    providedIn: 'root',
})
export class CanvasService {
    private canvasComponent!: CanvasComponent;
    public graph!: Graph;

    public constructor(private modalService: ModalService) {}

    public initComponent(canvasComponent: CanvasComponent): void {
        this.canvasComponent = canvasComponent;
    }

    public graphSetting(doc: any): void {
        Graph.registerEdge(
            'org-edge',
            {
                zIndex: -1,
                attrs: {
                    line: {
                        strokeWidth: 2,
                        stroke: '#A2B1C3',
                        sourceMarker: null,
                        targetMarker: null,
                    },
                },
            },
            true
        );

        Graph.registerNode(
            'org-node',
            {
                width: 180,
                height: 90,
                markup: [
                    {
                        tagName: 'rect',
                        attrs: {
                            class: 'card',
                        },
                    },
                    {
                        tagName: 'image',
                        attrs: {
                            class: 'image',
                        },
                    },
                    {
                        tagName: 'g',
                        attrs: {
                            class: 'btn add',
                        },
                        children: [
                            {
                                tagName: 'circle',
                                attrs: {
                                    class: 'add',
                                },
                            },
                            {
                                tagName: 'text',
                                attrs: {
                                    class: 'add',
                                },
                            },
                        ],
                    },
                    {
                        tagName: 'g',
                        attrs: {
                            class: 'btn del',
                        },
                        children: [
                            {
                                tagName: 'circle',
                                attrs: {
                                    class: 'del',
                                },
                            },
                            {
                                tagName: 'text',
                                attrs: {
                                    class: 'del',
                                },
                            },
                        ],
                    },
                ],
                attrs: {
                    '.card': {
                        rx: 10,
                        ry: 10,
                        refWidth: '100%',
                        refHeight: '100%',
                        fill: '#fef0bf',
                        stroke: '#ffca18',
                        strokeWidth: 2,
                        pointerEvents: 'visiblePainted',
                    },
                    '.image': {
                        x: 60,
                        y: 15,
                        width: 60,
                        height: 60,
                        opacity: 0.7,
                        xlinkHref:
                            'https://gw.alipayobjects.com/mdn/rms_43231b/afts/img/A*kUy8SrEDp6YAAAAAAAAAAAAAARQnAQ',
                    },
                    '.btn.add': {
                        refDx: -16,
                        refY: 16,
                        event: 'node:add',
                    },
                    '.btn.del': {
                        refDx: -44,
                        refY: 16,
                        event: 'node:delete',
                    },
                    '.btn > circle': {
                        r: 10,
                        fill: 'transparent',
                        stroke: '#000',
                        strokeWidth: 1,
                    },
                    '.btn.add > text': {
                        fontSize: 20,
                        fontWeight: 800,
                        fill: '#000',
                        x: -5.5,
                        y: 7,
                        fontFamily: 'Times New Roman',
                        text: '+',
                    },
                    '.btn.del > text': {
                        fontSize: 28,
                        fontWeight: 500,
                        fill: '#000',
                        x: -4.5,
                        y: 6,
                        fontFamily: 'Times New Roman',
                        text: '-',
                    },
                },
            },
            true
        );

        this.graph = new Graph({
            container: doc.querySelector('#pipeline') as HTMLElement,
            grid: {
                size: 20,
                visible: true,
                type: 'mesh',
                args: {
                    thickness: 1,
                },
            },
            // width: 100,
            scroller: {
                enabled: true,
                // pageVisible: true,
                // pageBreak: true,
                autoResize: true,
                // minVisibleWidth: 50,
                width: 2000,
                // minVisibleHeight: 20,
                pannable: true,
            },
            // ...canvas,
        });

        const source = this.graph.addNode({
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
                    cursor: 'pointer',
                },
                body: {
                    fill: '#ED8A19',
                    fillOpacity: 0.8,
                    cursor: 'pointer',
                },
            },
        });

        const target = this.graph.addNode({
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
                    cursor: 'pointer',
                },
                body: {
                    fill: '#ED8A19',
                    fillOpacity: 0.8,
                    cursor: 'pointer',
                },
            },
        });

        const edge = this.graph.addEdge({
            shape: 'org-edge',
            source,
            target,
        });

        this.graph.on('node:click', ({e, x, y, node, view}) => {
            if (node === source) this.modalService.showSource();
            else if (node === target) this.modalService.showDestination();
        });

        this.graph.on('node:mouseenter', ({node}) => {
            if (node !== source) {
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

        this.graph.on('node:mouseleave', ({node}) => {
            if (node !== target) {
                node.removeTools();
            }
        });
    }

    // public setup(): void {
    //     this.graph.on('node:add', ({e, node}) => {
    //         e.stopPropagation();
    //         const member = createNode('Employee', 'New Employee', Math.random() < 0.5 ? male : female);
    //         this.graph.freeze();
    //         this.graph.addCell([member, createEdge(node, member)]);
    //         layout();
    //     });
    //
    //     this.graph.on('node:delete', ({e, node}) => {
    //         e.stopPropagation();
    //         this.graph.freeze();
    //         this.graph.removeCell(node);
    //         this.layout();
    //     });
    // }

    // public createNode(image: string): any {
    //     return this.graph.createNode({
    //         shape: 'org-node',
    //         attrs: {
    //             '.image': {xlinkHref: image},
    //         },
    //     });
    // }
}
