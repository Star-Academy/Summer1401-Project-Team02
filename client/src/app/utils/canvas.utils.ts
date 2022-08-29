export const stateOfScrolling = {
    pageVisible: false,
    pageBreak: false,
    autoResize: true,
    minVisibleWidth: 50,
    minVisibleHeight: 50,
};

export const canvas: any = {
    grid: {
        size: 30,
        visible: true,
        type: 'dot',
        args: [
            {
                color: '#eee',
                thickness: 1,
            },
            {
                color: '#ddd',
                thickness: 1,
                factor: 4,
            },
        ],
    },

    background: {color: 'red'},

    scroller: stateOfScrolling,

    keyboard: true,

    mousewheel: {
        enabled: true,
        modifiers: ['ctrl', 'meta'],
    },
};

export const REGISTER_EDGE: any = {
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
};
export const REGISTER_NODE: any = {
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
            xlinkHref: 'https://gw.alipayobjects.com/mdn/rms_43231b/afts/img/A*kUy8SrEDp6YAAAAAAAAAAAAAARQnAQ',
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
};
