const {r_WRITE} = require('../js/regexs');
const  {SEMI} = require("../js/keywords");
let how_Many_fn_called = 1 ;

function write_rule_tiny_language(arrayOfTokens,i) {
    let acceptance ;
    let counter = i+1 ;
    let write_pattern = '';
    while(counter < arrayOfTokens.length && arrayOfTokens[counter].tokenType !== SEMI ) {
        write_pattern += arrayOfTokens[counter].tokenType;
        counter++;
    }
    if(counter < arrayOfTokens.length)
        write_pattern += SEMI;
    if(r_WRITE.test(write_pattern))
        acceptance = true
    else
        acceptance =  false   

    return {
        acceptance,
        write_details : acceptance ? '' : 'Check Syntax for "write" statement !',
        which_write : how_Many_fn_called++ 
    }
}


module.exports = write_rule_tiny_language;
