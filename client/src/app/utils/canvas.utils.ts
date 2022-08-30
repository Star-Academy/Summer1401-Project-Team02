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
        global: true,
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
            strokeDasharray: '',
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
    height: 100,

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
            tagName: 'image',
            attrs: {
                class: 'add',
            },
        },
        {
            tagName: 'image',
            attrs: {
                class: 'delete',
            },
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
            y: 10,
            width: 60,
            height: 60,
            opacity: 0.7,
            xlinkHref: 'https://gw.alipayobjects.com/mdn/rms_43231b/afts/img/A*kUy8SrEDp6YAAAAAAAAAAAAAARQnAQ',
        },
        '.name': {
            refX: 0.5,
            refY: 77,
            fill: '#000',
            fontFamily: 'Arial',
            fontSize: 14,
            fontWeight: '600',
            textAnchor: 'middle',
        },
        '.add': {
            refDx: -25,
            refDy: -25,
            width: 0,
            height: 0,
            xlinkHref: 'assets/plus.webp',
            event: 'node:add',
        },
        '.delete': {
            refDx: -30,
            width: 0,
            height: 0,
            xlinkHref: 'assets/delete.webp',
            event: 'node:delete',
        },
    },
};
