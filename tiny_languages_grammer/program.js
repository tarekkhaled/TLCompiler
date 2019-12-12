const {
    PLUS,MINUS,IF,END,READ,REPEAT,WRITE,THEN,
    ELSE,EQUAL,SEMI,ASSIGN,OPENBRACKET,CLOSEBRACKET,
    NUMBER,IDENTIFIER,UNTIL,MULT,DIV,LESSTHAN

} = require('./keywords');

const matchAndIncrementCounter = (tokenWeWantToMatchWith,comingToken,_) => {
    if(comingToken === tokenWeWantToMatchWith) {
        _.counter++;
        return true;
    }
    else {
        return false;
    }
}

const factor = (tokens,_) => {
    if(tokens[_.counter].tokenType === OPENBRACKET ) {
        const result1 = matchAndIncrementCounter(OPENBRACKET,tokens[_.counter].tokenType,_); 
        const result2 = exp(tokens[_.counter].tokenType);
        const result3 = matchAndIncrementCounter(CLOSEBRACKET,tokens[_.counter].tokenType,_)
        return result1 && result2 && result3;
    } 
    else if (tokens[_.counter].tokenType === NUMBER) {
        return matchAndIncrementCounter(NUMBER,tokens[_.counter].tokenType,_);
    }
    else if (tokens[_.counter].tokenType === IDENTIFIER) {
        return matchAndIncrementCounter(IDENTIFIER,tokens[_.counter].tokenType,_);
    }
    else {
        return false;
    }
}

const mulop = (tokens,_) => {
    if(tokens[_.counter].tokenType === MULT)
        return matchAndIncrementCounter(MULT,tokens[_.counter].tokenType,_);
    else if(tokens[_.counter].tokenType === DIV)
        return matchAndIncrementCounter(DIV,tokens[_.counter].tokenType,_);
    else 
        return false;
}

const term = (tokens,_) => {
    const result1 = factor(tokens,_);
    while(tokens[_.counter] && (tokens[_.counter].tokenType === MULT || tokens[_.counter].tokenType === DIV)) {
        const result2 = mulop(tokens,_);
        const result3 =factor(tokens,_);
        return result1 && result2 && result3;
    }
    return result1
}

const addop = (tokens,_) => {
    if(tokens[_.counter].tokenType === PLUS) 
        return matchAndIncrementCounter(PLUS,tokens[_.counter].tokenType,_);
    else if(tokens[_.counter].tokenType === MINUS)
        return matchAndIncrementCounter(MINUS,tokens[_.counter].tokenType,_);
    else
        return false;
}

const simple_exp = (tokens,_) => {
    const result1 = term(tokens,_);
    while(tokens[_.counter] && (tokens[_.counter].tokenType === PLUS || tokens[_.counter].tokenType === MINUS)) {
        const result2 = addop(tokens,_);
        const result3 = term(tokens,_);
        return result1 && result2 && result3
    }
    return result1;

}

const comparsion = (tokens,_) => {
    if(tokens[_.counter].tokenType === LESSTHAN)
        return matchAndIncrementCounter(LESSTHAN,tokens[_.counter].tokenType,_);
    else if(tokens[_.counter].tokenType === EQUAL)
        return matchAndIncrementCounter(EQUAL,tokens[_.counter].tokenType,_);
    else 
        return false;
}

const exp = (tokens,_) => {
    const result1 = simple_exp(tokens,_);
    if(tokens[_.counter] && (tokens[_.counter].tokenType === LESSTHAN || tokens[_.counter].tokenType === EQUAL)) {
        const result2 = comparsion(tokens,_);
        const result3 = simple_exp(tokens,_);
        return result1 && result2 && result3 ;
    }
    return result1;
}

const write = (tokens,_) => {
    if(tokens[_.counter].tokenType === WRITE) {
        const result1 = matchAndIncrementCounter(WRITE,tokens[_.counter].tokenType,_);
        const result2 = exp(tokens,_);
        return result1 && result2
    }
    else 
        return false;
}

const read = (tokens,_) => {
    if(tokens[_.counter].tokenType === READ) {
        const result1 = matchAndIncrementCounter(READ,tokens[_.counter].tokenType,_);
        if(tokens[_.counter].tokenType === IDENTIFIER) {
            const result2 = matchAndIncrementCounter(IDENTIFIER,tokens[_.counter].tokenType,_);
            return result1 && result2;
        } else {
            return false;
        }
    }
    else 
        return false;
}

const assign = (tokens,_) => {
    if(tokens[_.counter].tokenType === IDENTIFIER) {
        const result1 = matchAndIncrementCounter(IDENTIFIER,tokens[_.counter].tokenType,_);
        if(tokens[_.counter].tokenType === ASSIGN) {
            const result2 = matchAndIncrementCounter(ASSIGN,tokens[_.counter].tokenType,_);
            const result3 = exp(tokens,_);
            return result1 && result2 && result3;
        } else {
            return false;
        }
    }
    else 
        return false;
}

const repeat = (tokens,_) => {
    if(tokens[_.counter].tokenType === REPEAT) {
        const result1 = matchAndIncrementCounter(REPEAT,tokens[_.counter].tokenType,_);
        const result2 = stmt_seq(tokens,_);
        const result3 = matchAndIncrementCounter(UNTIL,tokens[_.counter].tokenType,_);
        const result4 = exp(tokens,_);
        return result1 && result2 && result3 && result4;
    }
    else 
        return false;
}

const if_stmt = (tokens,_) => {
    if(tokens[_.counter].tokenType === IF) {
        const result1 = matchAndIncrementCounter(IF,tokens[_.counter].tokenType,_);
        const result2 = exp(tokens,_);
        const result3 = matchAndIncrementCounter(THEN,tokens[_.counter].tokenType,_);
        const result4 = stmt_seq(tokens,_);
        if(tokens[_.counter].tokenType === ELSE){
            const result5 = matchAndIncrementCounter(ELSE,tokens[_.counter].tokenType,_);
            const result6 = stmt_seq(tokens,_);
            const result7 = matchAndIncrementCounter(END,tokens[_.counter].tokenType,_);
            return result1 && result2 && result3 && result4 && result5 && result5 && result6 && result7
        }
        if(tokens[_.counter].tokenType === SEMI) {
            const result5 = matchAndIncrementCounter(SEMI,tokens[_.counter].tokenType,_);
            const result6 = stmt_seq(tokens,_);
        }
        let result5 = '';
        if(tokens[_.counter])
            result5 = matchAndIncrementCounter(END,tokens[_.counter].tokenType,_);
        else
            result5 = false;
        
        return result1 && result2 && result3 && result4 && result5 
    }
    else 
        return false;
}

const statment = (tokens,_) => {
    if(tokens[_.counter] && tokens[_.counter].tokenType === IF) 
        return if_stmt(tokens,_);
    else if(tokens[_.counter] && tokens[_.counter].tokenType === READ)
        return read(tokens,_);
    else if(tokens[_.counter] && tokens[_.counter].tokenType === WRITE)
        return write(tokens,_);
    else if(tokens[_.counter] && tokens[_.counter].tokenType === REPEAT)
        return repeat(tokens,_);
    else if(tokens[_.counter] && tokens[_.counter].tokenType === IDENTIFIER && tokens[_.counter+1].tokenType === ASSIGN)
        return assign(tokens,_);
    else 
        return false;
}

const stmt_seq = (tokens,_) => {
    const result1 = statment(tokens,_);
    while(tokens[_.counter] && tokens[_.counter].tokenType === SEMI) {
       const result2 = matchAndIncrementCounter(SEMI,tokens[_.counter].tokenType,_)
       const result3 = statment(tokens,_);
       return result1 && result2 && result3;
    }
    return result1;
}

const program = (tokens,_) => {
    return stmt_seq(tokens,_);
}


module.exports = program;