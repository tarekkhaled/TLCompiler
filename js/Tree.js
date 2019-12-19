class Tree {
    constructor(node) {
        this.node = node
        this.descendents = [];
        this.position = ''
        this.objectOnDOM = ''
    }

    static connectNodes = (node1,node2) => {
        const canvas = document.querySelector('canvas');
        const ctx = canvas.getContext('2d');
        ctx.moveTo(node1.x,node1.y);
        ctx.lineTo(node2.x,node2.y);
        ctx.stroke();

    }
    
    addNodeToTree = (node) => {
        this.descendents.push(node)
    }

    drawNode = (styleObject = {shift_left : '10px',shift_top : '10px'}) => {
        const {value,options : {sibling}} = this.node;
        const spanToDraw = document.createElement('span');
        spanToDraw.innerHTML = `${value}(${sibling})` 
        spanToDraw.classList.add('rectangle_statement')
        spanToDraw.style.left = styleObject.shift_left ;
        spanToDraw.style.top = styleObject.shift_top ;
        document.body.appendChild(spanToDraw);
        this.position = spanToDraw.getBoundingClientRect();
        this.objectOnDOM = spanToDraw;
    }

    getTreePosition = () => {
        return this.position
    }
}

module.exports = Tree;