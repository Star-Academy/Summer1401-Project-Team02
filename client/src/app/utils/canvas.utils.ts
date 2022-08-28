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
