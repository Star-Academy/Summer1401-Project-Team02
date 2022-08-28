import {Injectable} from '@angular/core';
import {Dom, Graph} from '@antv/x6';
import {CanvasComponent} from '../../pages/pipeline/components/canvas/canvas.component';
import {ModalService} from '../modal/modal.service';
import dagre from 'dagre';
import {insertCss} from 'insert-css';
import {PipelineService} from '../pipeline/pipeline.service';
import {iconCanvas} from '../../utils/icon-canvas';
import {NodeType} from '../../enums/node-type';

@Injectable({
    providedIn: 'root',
})
export class CanvasService {
    private dir: string = 'LR';
    private canvasComponent!: CanvasComponent;
    public graph!: Graph;
    private canvasNodes: any = [];
    private canvasEdges: any = [];

    public constructor(private modalService: ModalService, private pipelineService: PipelineService) {}

    public initComponent(canvasComponent: CanvasComponent): void {
        this.canvasComponent = canvasComponent;
    }

    public graphSetting(doc: any): void {
        insertCss(`
            .x6-cell {
                cursor: pointer;
            }
        `);

        Graph.registerEdge(
            'org-edge',
            {
                zIndex: -1,
                markup: [
                    {
                        tagName: 'path',
                        selector: 'line',
                    },

                    {
                        tagName: 'text',
                        selector: 'offsetLabelMarker',
                    },
                ],
                attrs: {
                    line: {
                        strokeWidth: 2,
                        stroke: '#A2B1C3',
                        sourceMarker: null,
                        targetMarker: null,
                        connection: true,
                        fill: 'none',
                    },
                    offsetLabelMarker: {
                        atConnectionRatio: 0.5,
                        textAnchor: 'middle',
                        textVerticalAnchor: 'middle',
                        text: '+',
                        fill: '#03a9f4',
                        stroke: 'black',
                        strokeWidth: 1,
                        fontSize: 40,
                        fontWeight: 'bold',
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
                        tagName: 'text',
                        attrs: {
                            class: 'name',
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
                        rx: 5,
                        ry: 5,
                        refWidth: '100%',
                        refHeight: '100%',
                        fill: '#f3f3f3',
                        stroke: '#bcbcbc',
                        strokeWidth: 3,
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
                    '.name': {
                        refX: 0.5,
                        refY: 100,
                        fill: '#000',
                        fontFamily: 'Arial',
                        fontSize: 14,
                        fontWeight: '600',
                        textAnchor: 'middle',
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
                        r: 0,
                        strokeWidth: 1,
                    },
                    '.btn.add > circle': {
                        fill: '#28a745',
                        stroke: '#367845',
                    },
                    '.btn.del > circle': {
                        fill: '#dc3545',
                        stroke: '#8c323b',
                    },
                    '.btn.add > text': {
                        fontSize: 0,
                        fontWeight: 800,
                        fill: '#fff',
                        x: -5.5,
                        y: 7,
                        fontFamily: 'Times New Roman',
                        text: '+',
                    },
                    '.btn.del > text': {
                        fontSize: 0,
                        fontWeight: 500,
                        fill: '#fff',
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
                size: 30,
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

        this.pipelineService.addNode(NodeType.SourceNode);

        const source = this.createNode(this.pipelineService.selectedIdNode, this.pipelineService.selectedTypeNode);

        this.graph.resetCells([source]);
        this.layout();
        this.graph.zoomTo(0.85);
        this.setup();
    }

    public layout(): void {
        const nodes = this.graph.getNodes();
        const edges = this.graph.getEdges();
        const g = new dagre.graphlib.Graph();
        g.setGraph({rankdir: this.dir, nodesep: 16, ranksep: 16});
        g.setDefaultEdgeLabel(() => ({}));

        const width = 280;
        const height = 120;
        nodes.forEach((node) => {
            g.setNode(node.id, {width, height});
        });

        edges.forEach((edge) => {
            const source: any = edge.getSource();
            const target: any = edge.getTarget();
            g.setEdge(source.cell, target.cell);
        });

        dagre.layout(g);

        this.graph.freeze();

        g.nodes().forEach((id: any) => {
            const node: any = this.graph.getCell(id);
            if (node) {
                const pos = g.node(id);
                node.position(pos.x, pos.y);
            }
        });

        this.graph.unfreeze();
    }

    public createNode(_ID: string, type: NodeType): any {
        const {label, image} = iconCanvas[type];
        const newNode = this.graph.createNode({
            shape: 'org-node',
            attrs: {
                '.image': {xlinkHref: image},
                '.name': {
                    text: Dom.breakText(label, {width: 160, height: 45}),
                },
            },
            _ID,
            type,
        });
        this.canvasNodes.push(newNode);
        console.log(this.canvasNodes);
        return newNode;
    }

    public createEdge(source: any, target: any, previous: any, next: any): any {
        const newEdge = this.graph.createEdge({
            shape: 'org-edge',
            source,
            target,
            connector: {
                name: 'smooth',
            },
            previous,
            next,
        });
        this.canvasEdges.push(newEdge);
        return newEdge;
    }

    public resetEdge(): void {
        this.canvasEdges.forEach((edge: any) => {
            this.graph.removeEdge(edge.id);
        });
        this.canvasEdges = [];
        console.log(this.canvasNodes);
        this.pipelineService.nodes.forEach((node) => {
            const current = this.canvasNodes.find((x: any) => x.store.data._ID === node.id);
            const pre = this.canvasNodes.find((x: any) => x.store.data._ID === node._previousNodesId);
            console.log(node._previousNodesId, pre, node.id, current);
            // if (pre && current) this.createEdge(pre, current, node._previousNodesId, node.id);
            if (pre && current)
                this.graph.addCell([
                    current,
                    this.createEdge(pre, current, pre.store.data._ID, current.store.data._ID),
                ]);
        });
    }

    public setup(): void {
        this.graph.on('node:add', ({e, node}: any) => {
            e.stopPropagation();
            this.pipelineService.selectedPreviousNode = node.store.data._ID;
            this.pipelineService.addNode(NodeType.DestinationNode);
            const member = this.createNode(this.pipelineService.selectedIdNode, NodeType.DestinationNode);
            this.graph.freeze();
            this.graph.addCell([member, this.createEdge(node, member, node.store.data._ID, member.store.data._ID)]);
            this.layout();
        });

        this.graph.on('node:delete', ({e, node}: any) => {
            e.stopPropagation();
            this.graph.freeze();
            let deleteNode: any;
            this.pipelineService.nodes.forEach((n, i) => {
                if (n.id === node.store.data._ID) {
                    deleteNode = {...n};
                    this.pipelineService.nodes.splice(i, 1);
                    return;
                }
            });
            this.pipelineService.nodes.forEach((n) => {
                if (n._previousNodesId === deleteNode?.id) n._previousNodesId = deleteNode?._previousNodesId;
            });
            this.canvasNodes.forEach((n: any, i: any) => {
                if (n.store.data._ID === deleteNode?.id) {
                    this.canvasNodes.splice(i, 1);
                    return;
                }
            });
            this.graph.removeCell(node);
            this.resetEdge();
            this.layout();
        });

        this.graph.on('edge:click', ({e, edge}: any) => {
            e.stopPropagation();
            this.pipelineService.selectedPreviousNode = edge.store.data.previous;
            this.pipelineService.selectedNextNode = edge.store.data.next;
            this.modalService.showProcess();
        });

        this.graph.on('node:click', ({e, node}: any) => {
            if (node.store.data.type === NodeType.SourceNode) this.modalService.showSource();
            else if (node.store.data.type === NodeType.DestinationNode) this.modalService.showDestination();
            else {
                this.pipelineService.selectedIdNode = node.store.data._ID;
            }
        });

        this.graph.on('node:mouseenter', ({node}: any) => {
            if (node.store.data.type !== NodeType.DestinationNode && node.store.data.type !== NodeType.SourceNode) {
                node.attr('.btn > circle', {
                    r: 10,
                });
                node.attr('.btn.add > text', {
                    fontSize: 20,
                });
                node.attr('.btn.del > text', {
                    fontSize: 28,
                });
            } else if (node.store.data.type === NodeType.SourceNode) {
                node.attr('.btn.add > circle', {
                    r: 10,
                });
                node.attr('.btn.add > text', {
                    fontSize: 20,
                });
            } else if (node.store.data.type === NodeType.DestinationNode) {
                node.attr('.btn.del > circle', {
                    r: 10,
                });
                node.attr('.btn.del > text', {
                    fontSize: 28,
                });
                node.attr('.btn.del', {
                    refDx: -16,
                });
            }
        });

        this.graph.on('node:mouseleave', ({node}: any) => {
            node.attr('.btn.add > circle', {
                r: 0,
            });
            node.attr('.btn.del > circle', {
                r: 0,
            });
            node.attr('.btn.add > text', {
                fontSize: 0,
            });
            node.attr('.btn.del > text', {
                fontSize: 0,
            });
        });
    }
}
