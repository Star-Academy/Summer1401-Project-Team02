import {Injectable} from '@angular/core';
import {Graph} from '@antv/x6';
import {CanvasComponent} from '../components/canvas/canvas.component';

@Injectable({
    providedIn: 'root',
})
export class CanvasService {
    private canvasComponent!: CanvasComponent;
    public graph!: Graph;

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

        console.log(111);
        this.graph = new Graph({
            container: doc.querySelector('#pipeLine') as HTMLElement,
            grid: true,
            // ...canvas,
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
