const {r_READ} = require('../js/regexs');
const {SEMI} = require('../js/keywords');
let how_Many_fn_called = 1 ;

function read_rule_tiny_language(arrayOfTokens,i) {
    let acceptance ;
    let counter = i+1 ;
    let read_pattern = '';
    while(counter < arrayOfTokens.length && arrayOfTokens[counter].tokenType !== SEMI ) {
        read_pattern += arrayOfTokens[counter].tokenType;
        counter++;
    }
    if(counter < arrayOfTokens.length)
        read_pattern += SEMI;
    if(r_READ.test(read_pattern))
        acceptance = true
    else
        acceptance =  false   

    return {
        acceptance,
        read_details: acceptance? '' :'Check Syntax for "read" statement !',
        which_read : how_Many_fn_called++ 
    }; 
}


module.exports = read_rule_tiny_language;