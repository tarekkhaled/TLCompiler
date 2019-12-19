class Nodee {
    constructor(nodeObject) {
        this.value = nodeObject.value;
        this.options = nodeObject.options;
        this.position = ''
        this.objectOnDOM = ''
    }
    drawNode = (styleObject = {shift_left : '10px',shift_top : '10px'}) => {
        const {statement,sibling} = this.options;
        const regex = /IF_S|READ_S|WRITE_S|ASSIGN_S|REPEAT_S/;
        if(regex.test(statement)) {
            const spanToDraw = document.createElement('span');
            spanToDraw.innerHTML = `${this.value}(${sibling})` 
            spanToDraw.classList.add('rectangle_statement')
            spanToDraw.style.left = styleObject.shift_left ;
            spanToDraw.style.top = styleObject.shift_top ;
            document.body.appendChild(spanToDraw);
            this.position = spanToDraw.getBoundingClientRect();
            this.objectOnDOM = spanToDraw;
        }
        else {
            const spanToDraw = document.createElement('span');
            spanToDraw.innerHTML = `${this.value}(${sibling})` 
            spanToDraw.classList.add('oval_statement')
            spanToDraw.style.left = styleObject.shift_left ;
            spanToDraw.style.top = styleObject.shift_top ;
            document.body.appendChild(spanToDraw);
            this.position = spanToDraw.getBoundingClientRect();
            this.objectOnDOM = spanToDraw;
        }
    }

    getTreePosition = () => {
        return this.position
    }

    getNodeOnDOM = () => {
        return this.objectOnDOM
    }
}


module.exports = Nodee;