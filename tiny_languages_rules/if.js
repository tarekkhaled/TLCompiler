const {r_IF} = require('../js/regexs');
const  {END} = require("../js/keywords");
let how_Many_fn_called = 1 ;

function if_rule_tiny_language(arrayOfTokens,i) {
    let acceptance ;
    let counter = i+1 ;
    let if_pattern = '';
    while(counter < arrayOfTokens.length && arrayOfTokens[counter].tokenType !== END ) {
        if_pattern += arrayOfTokens[counter].tokenType;
        counter++;
    }
    /** Here meaning that he ended the while loop because of SEMI but he didn't write it */
    if(counter < arrayOfTokens.length)
        if_pattern += END;
    if(r_IF.test(if_pattern))
        acceptance = true
    else
        acceptance =  false   
    
    return {
        acceptance,
        write_details : acceptance ? '' : 'Check Syntax for "if" and make sure to use "then" and "end" with if !',
        which_if : how_Many_fn_called++
    };  
}


module.exports = if_rule_tiny_language;
