const Tree = require('./js/Tree')
const Nodee = require('./js/Nodee');
const program = require('./tiny_languages_grammer/program-to-tree');

let _ = {
    counter : 0
}

require('electron').ipcRenderer.on('tokens-ready',(event,tokens) => {
    const theTree = new Tree(new Nodee({
        value : 'root'
    }));
    
    program(tokens,_,theTree);
    
    function TraversingAndMapping_Tree_by_DepthFirstSearch(root){
        let currentParent = '';
        const lengths = [];
        const treesObject = [];
        let timeOfCurrentParent = 0;
        let tree = root,counter = 0 ;
        const data = [];
        const queuee = [];
        queuee.push(tree)
        while(queuee.length) {
            tree = queuee.shift();
            const tree_object = {
                text : ''
            }
            if(currentParent) {
                tree_object.parent = currentParent;
            }
            if(tree.node) {
                const text = {
                    name : tree.node.value,
                }
                tree_object.text = text;
            } else {
                const text = {
                    name : tree.value,
                    title : tree.options.sibling
                }
                tree_object.text = text;
            }
            data.push(tree_object) 
            if(tree.descendents && timeOfCurrentParent === 0) {
                while(counter < tree.descendents.length) {
                    currentParent = tree_object;
                    timeOfCurrentParent = tree.descendents.length+1 ;
                    queuee.push(tree.descendents[counter])
                    counter++;
                }
                counter = 0 ;
            } else if (tree.descendents) {
                if(tree.descendents.length > 0)
                {
                    lengths.push(tree.descendents.length);
                    treesObject.push(tree_object)
                }
                while(counter < tree.descendents.length) {
                    queuee.push(tree.descendents[counter])
                    counter++;
                }
                counter = 0 ;
            }
            timeOfCurrentParent--;
            if(timeOfCurrentParent === 0) {
                if(tree.descendents && tree.descendents.length) {
                    timeOfCurrentParent = lengths.shift()
                } else {
                    timeOfCurrentParent = lengths.shift()
                }
                currentParent = treesObject.shift();
            }
        }
        return data;
    
    }
    
    const chart_config = TraversingAndMapping_Tree_by_DepthFirstSearch(theTree);
    
    var config = {
        container: "#basic-example",
        
        connectors: {
            type: 'step'
        },
        node: {
            HTMLclass: 'nodeExample1'
        }
    }
    
    
    chart_config.unshift(config);
    
    new Treant( chart_config );
    
    
})

