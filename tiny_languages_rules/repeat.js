const {r_REPEAT} = require('../js/regexs');
const  {UNTIL} = require("../js/keywords");
let how_Many_fn_called = 1 ;

function repeat_rule_tiny_language(arrayOfTokens,i) {
    let acceptance ;
    let counter = i+1 ;
    let repeat_pattern = '';
    while(counter < arrayOfTokens.length && arrayOfTokens[counter].tokenType !== UNTIL ) {
        repeat_pattern += arrayOfTokens[counter].tokenType;
        counter++;
    }
    /** Here meaning that he ended the while loop because of SEMI but he didn't write it */
    if(counter < arrayOfTokens.length)
        repeat_pattern += UNTIL;
    if(r_REPEAT.test(repeat_pattern))
        acceptance = true
    else
        acceptance =  false   
    
    return {
        acceptance,
        write_details : acceptance ? '' : 'Check Syntax for "repeat" and make sure to use "until" with repeat !',
        which_repeat : how_Many_fn_called++
    };  
}


module.exports = repeat_rule_tiny_language;
