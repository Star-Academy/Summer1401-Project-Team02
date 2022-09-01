import {Injectable} from '@angular/core';
import {Dom, Graph} from '@antv/x6';
import {CanvasComponent} from '../../pages/pipeline/components/canvas/canvas.component';
import {ModalService} from '../modal/modal.service';
import dagre from 'dagre';
import {insertCss} from 'insert-css';
import {PipelineService} from '../pipeline/pipeline.service';
import {canvasUtils} from '../../utils/icon-canvas';
import {NodeType} from '../../enums/node-type';
import {SourceNodeModel} from '../../models/source-node.model';
import {DestinationNodeModel} from '../../models/destination-node.model';
import {REGISTER_EDGE, REGISTER_NODE} from '../../utils/canvas.utils';

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
            
            @keyframes running-line {
                to {
                    stroke-dashoffset: -1000;
                }
            }
        `);

        Graph.registerEdge('org-edge', REGISTER_EDGE, true);

        Graph.registerNode('org-node', REGISTER_NODE, true);

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
            mousewheel: {
                enabled: true,
                global: true,
                modifiers: ['ctrl', 'meta'],
            },
            selecting: {
                enabled: true,
                multiple: true,
                rubberEdge: true,
                rubberNode: true,
                modifiers: ['ctrl', 'alt'],
                rubberband: true,
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
        const {label, image} = canvasUtils[type];
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
        this.canvasNodes.unshift(newNode);
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
        this.pipelineService.nodes.forEach((node) => {
            const current = this.canvasNodes.find((x: any) => x.store.data._ID === node.id);
            const pre = this.canvasNodes.find((x: any) => x.store.data._ID === node._previousNode);
            if (pre && current)
                this.graph.addCell([
                    current,
                    this.createEdge(pre, current, pre.store.data._ID, current.store.data._ID),
                ]);
        });
    }

    public running(status: boolean): void {
        const edges = this.graph.getEdges();
        edges?.forEach((edge) => {
            if (status) {
                edge.attr('line/strokeDasharray', 5);
                edge.attr('line/style/animation', 'running-line 30s infinite linear');
            } else {
                edge.attr('line/strokeDasharray', '');
                edge.attr('line/style/animation', '');
            }
        });
    }

    public addDestinationsSituation(): void {
        if (!this.pipelineService.lastExecuteResult) return;
        this.canvasNodes.forEach((node: any) => {
            if (node.store.data.type === NodeType.DestinationNode) {
                if (this.pipelineService.lastExecuteResult[node.store.data._ID] === 'success') {
                    node.attr('.card/stroke', '#019d01');
                    node.attr('.card/fill', '#eaffea');
                } else {
                    node.attr('.card/stroke', '#ff0000');
                    node.attr('.card/fill', '#ffecec');
                }
            }
        });
    }

    public changeSrcAndDestIcon(id: string, full: boolean): void {
        const node: any = this.canvasNodes.find((node: any) => node.store.data._ID === id);
        let label: string = '';
        if (node.store.data.type === NodeType.SourceNode) label = 'Source';
        else if (node.store.data.type === NodeType.DestinationNode) label = 'Destination';
        node.attr('.image/xlinkHref', `assets/${full ? 'source' : 'empty'}.webp`);
        node.attr(
            '.name/text',
            Dom.breakText(`${label}${full ? '' : ' (empty)'}`, {
                width: 160,
                height: 45,
            })
        );
    }

    public setup(): void {
        this.graph.on('node:add', ({e, node}: any) => {
            e.stopPropagation();
            this.pipelineService.selectedPreviousNode = node.store.data._ID;
            this.pipelineService.selectedNextNode = '';
            this.pipelineService.addNode(NodeType.DestinationNode);
            const member = this.createNode(this.pipelineService.selectedIdNode, NodeType.DestinationNode);
            this.graph.freeze();
            this.graph.addCell([member, this.createEdge(node, member, node.store.data._ID, member.store.data._ID)]);
            this.layout();
        });

        this.graph.on('node:delete', ({e, node}: any) => {
            e.stopPropagation();
            if (node.store.data.type === NodeType.SourceNode) {
                const selectedPipelineNode: any = this.pipelineService.getSourceNode() as SourceNodeModel;
                selectedPipelineNode._tableId = '';
                this.pipelineService.editNode(selectedPipelineNode);
                this.pipelineService.previewContent = null;
                this.changeSrcAndDestIcon(selectedPipelineNode.id, false);
                node.attr('.delete/width', 0);
                node.attr('.delete/height', 0);
            } else {
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
                    if (n._previousNode === deleteNode?.id) n._previousNode = deleteNode?._previousNode;
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
            }
        });

        this.graph.on('edge:click', ({e, edge}: any) => {
            e.stopPropagation();
            this.pipelineService.selectedPreviousNode = edge.store.data.previous;
            this.pipelineService.selectedNextNode = edge.store.data.next;
            this.modalService.showProcess();
        });

        this.graph.on('node:click', ({e, node}: any) => {
            this.pipelineService.selectedIdNode = node.store.data._ID;
            this.pipelineService.selectedTypeNode = node.store.data.type;
            this.pipelineService.preview();

            if (node.store.data.type === NodeType.SourceNode) {
                const selectedPipelineNode = this.pipelineService.getSelectedNode() as SourceNodeModel;
                if (!selectedPipelineNode?._tableId) this.modalService.showSource();
            } else if (node.store.data.type === NodeType.DestinationNode) {
                const selectedPipelineNode = this.pipelineService.getSelectedNode() as DestinationNodeModel;
                if (!selectedPipelineNode?._tableId) this.modalService.showDestination();
            }
        });

        this.graph.on('node:mouseenter', ({node}: any) => {
            if (node.store.data.type !== NodeType.DestinationNode && node.store.data.type !== NodeType.SourceNode) {
                node.attr('.delete/width', 30);
                node.attr('.delete/height', 30);
                node.attr('.add/width', 22);
                node.attr('.add/height', 22);
            } else if (node.store.data.type === NodeType.SourceNode) {
                node.attr('.add/width', 22);
                node.attr('.add/height', 22);
                const selectedPipelineNode = this.pipelineService.getSourceNode() as SourceNodeModel;
                if (selectedPipelineNode._tableId) {
                    node.attr('.delete/width', 30);
                    node.attr('.delete/height', 30);
                }
            } else if (node.store.data.type === NodeType.DestinationNode) {
                node.attr('.delete/width', 30);
                node.attr('.delete/height', 30);
            }
        });

        this.graph.on('node:mouseleave', ({node}: any) => {
            node.attr('.add/width', 0);
            node.attr('.add/height', 0);
            node.attr('.delete/width', 0);
            node.attr('.delete/height', 0);
        });
    }
}
