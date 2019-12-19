const Tree = require('../js/Tree');
const Nodee = require('../js/Nodee');

const {
    PLUS,MINUS,IF,END,READ,REPEAT,WRITE,THEN,
    ELSE,EQUAL,SEMI,ASSIGN,OPENBRACKET,CLOSEBRACKET,
    NUMBER,IDENTIFIER,UNTIL,MULT,DIV,LESSTHAN

} = require('./keywords');

const program = (tokens,_,treeRoot) => {
    return stmt_seq(tokens,_,treeRoot);
}

const stmt_seq = (tokens,_,treeRoot) => {
    statment(tokens,_,treeRoot);
    while(tokens[_.counter] && tokens[_.counter].tokenType === SEMI) {
       matchAndIncrementCounter(_)
       statment(tokens,_,treeRoot);
    }
}

const statment = (tokens,_,treeRoot) => {
    if(tokens[_.counter] && tokens[_.counter].tokenType === IF) {
        // here means that i'm coming from if so change the treeRoot to if
        const If_tree = new Tree(new Nodee({
            value : 'if',
            options : {
                sibling : '',
                statement : 'IF_S'
            }
        }));
        treeRoot.addNodeToTree(If_tree)
        return if_stmt(tokens,_,If_tree);
    }
    else if(tokens[_.counter] && tokens[_.counter].tokenType === READ) {
        const Read_tree = new Tree(new Nodee({
            value : 'read',
            options : {
                sibling : tokens[_.counter+1].tokenValue,
                statement : 'READ_S'
            }
        }));
        treeRoot.addNodeToTree(Read_tree);
        return read(tokens,_,Read_tree);
    }
    else if(tokens[_.counter] && tokens[_.counter].tokenType === WRITE) {
        const Write_tree = new Tree(new Nodee({
            value : 'write',
            options : {
                sibling : '',
                statement : 'WRITE_S'
            }
        }));
        treeRoot.addNodeToTree(Write_tree)
        return write(tokens,_,Write_tree);
    }
    else if(tokens[_.counter] && tokens[_.counter].tokenType === REPEAT) {
        const Repeat_tree = new Tree(new Nodee({
            value : 'repeat',
            options : {
                sibling : '',
                statement : 'REPEAT_S'
            }
        }))
        treeRoot.addNodeToTree(Repeat_tree)
        return repeat(tokens,_,Repeat_tree);
    }
    else if(tokens[_.counter] && tokens[_.counter].tokenType === IDENTIFIER && tokens[_.counter+1].tokenType === ASSIGN) {
        const Assign_tree = new Tree(new Nodee({
            value : 'assign',
            options : {
                sibling : tokens[_.counter].tokenValue,
                statement : 'ASSIGN_S'
            }
        }))
        treeRoot.addNodeToTree(Assign_tree)
        return assign(tokens,_,Assign_tree);
    }
    else 
        return false;
}

const if_stmt = (tokens,_,treeRoot) => {
    if(tokens[_.counter].tokenType === IF) {
        matchAndIncrementCounter(_);
        exp(tokens,_,treeRoot);
        matchAndIncrementCounter(_);
        stmt_seq(tokens,_,treeRoot);
        if(tokens[_.counter].tokenType === ELSE){
            matchAndIncrementCounter(_);
            stmt_seq(tokens,_,treeRoot);
            matchAndIncrementCounter(_);
        }
        if(tokens[_.counter].tokenType === SEMI) {
            matchAndIncrementCounter(_);
            stmt_seq(tokens,_,treeRoot);
        }
        if(tokens[_.counter])
            matchAndIncrementCounter(_);        
    }
    else 
        return false;
}

const repeat = (tokens,_,treeRoot) => {
    if(tokens[_.counter].tokenType === REPEAT) {
        matchAndIncrementCounter(_);
        stmt_seq(tokens,_,treeRoot);
        matchAndIncrementCounter(_);
        exp(tokens,_,treeRoot);
    }
}

const write = (tokens,_,treeRoot) => {
    if(tokens[_.counter].tokenType === WRITE) {
        matchAndIncrementCounter(_);
        exp(tokens,_,treeRoot);
    }
    else 
        return false;
}

const read = (tokens,_,treeRoot) => {
    if(tokens[_.counter].tokenType === READ) {
        matchAndIncrementCounter(_);
        if(tokens[_.counter].tokenType === IDENTIFIER) {
            matchAndIncrementCounter(_);
        } 
    }
}

const assign = (tokens,_,treeRoot) => {
    if(tokens[_.counter].tokenType === IDENTIFIER) {
        matchAndIncrementCounter(_);
        if(tokens[_.counter].tokenType === ASSIGN) {
            matchAndIncrementCounter(_);
            exp(tokens,_,treeRoot);
        } 
    } 
}

const exp = (tokens,_,treeRoot) => {
    const Exp_tree = new Tree(new Nodee({
        value : 'exp',
        options : {
            sibling : '',
            statement :'Other'
        }
    }))
    treeRoot.addNodeToTree(Exp_tree); 
    simple_exp(tokens,_,Exp_tree);
    if(tokens[_.counter] && (tokens[_.counter].tokenType === LESSTHAN || tokens[_.counter].tokenType === EQUAL)) {
        comparsion(tokens,_,Exp_tree);
        simple_exp(tokens,_,Exp_tree);
    }
}

const simple_exp = (tokens,_,treeRoot) => {
    // const Simple_tree = new Tree(new Nodee({
    //     value : '',
    //     options : {
    //         sibling : '',
    //         statement :'Other'
    //     }
    // }))
    // treeRoot.addNodeToTree(Simple_tree); 
    term(tokens,_,treeRoot);
    while(tokens[_.counter] && (tokens[_.counter].tokenType === PLUS || tokens[_.counter].tokenType === MINUS)) {
        addop(tokens,_,treeRoot);
        term(tokens,_,treeRoot);
    }
}

const term = (tokens,_,treeRoot) => {
    // const Term_tree = new Tree(new Nodee({
    //     value : '',
    //     options : {
    //         sibling : '',
    //         statement :'Other'
    //     }
    // }))
    // treeRoot.addNodeToTree(Term_tree); 
    factor(tokens,_,treeRoot);
    while(tokens[_.counter] && (tokens[_.counter].tokenType === MULT || tokens[_.counter].tokenType === DIV)) {
        mulop(tokens,_,treeRoot);
        factor(tokens,_,treeRoot);
    }
}

const factor = (tokens,_,treeRoot) => {
    // const Factor_tree = new Tree(new Nodee({
    //     value : '',
    //     options : {
    //         sibling : '',
    //         statement :'Other'
    //     }
    // }))
    // treeRoot.addNodeToTree(Factor_tree); 
    if(tokens[_.counter].tokenType === OPENBRACKET ) {
        matchAndIncrementCounter(_); 
        exp(tokens,_,treeRoot);
        matchAndIncrementCounter(_)
    } 
    treeRoot.addNodeToTree(new Nodee({
        value : tokens[_.counter].tokenType.toLowerCase(),
        options : {
            sibling : tokens[_.counter].tokenValue,
            statement : 'Other'
        }
    }))
    matchAndIncrementCounter(_);
}

const addop = (tokens,_,treeRoot) => {
        treeRoot.addNodeToTree(new Nodee({
            value : 'OP',
            options : {
                sibling : tokens[_.counter].tokenValue,
                statement : 'Other'
        }
    }))
    matchAndIncrementCounter(_);
}

const comparsion = (tokens,_,treeRoot) => {
    treeRoot.addNodeToTree(new Nodee({
        value : 'OP',
        options : {
            sibling : tokens[_.counter].tokenValue,
            statement : 'Other'
    }
    }))
    matchAndIncrementCounter(_);
}

const mulop = (tokens,_,treeRoot) => {
    treeRoot.addNodeToTree(new Nodee({
        value : 'OP',
        options : {
            sibling : tokens[_.counter].tokenValue,
            statement : 'Other'
    }
    }))
    matchAndIncrementCounter(_);
}

const matchAndIncrementCounter = (_) => {
        _.counter++;
}

module.exports = program;