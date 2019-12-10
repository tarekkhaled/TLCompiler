const {r_UNTIL} = require('../js/regexs');
const  {UNTIL,REPEAT,SEMI} = require("../js/keywords");
let how_Many_fn_called = 1 ;

function until_rule_tiny_language(arrayOfTokens,i) {
    let acceptance ;
    let counter = i+1 ;
    let until_pattern = '';
    let repeat_found = false;
    while(counter < arrayOfTokens.length && arrayOfTokens[counter].tokenType !== SEMI ) {
        until_pattern += arrayOfTokens[counter].tokenType;
        counter++;
    }
    while(i-1 >= -1) {
        let the_repeat_found_for_this_until = true;
        if(arrayOfTokens[i].tokenType === UNTIL) {
            the_repeat_found_for_this_until = false;
        }
        if(the_repeat_found_for_this_until && arrayOfTokens[i].tokenType === REPEAT ) {
            repeat_found = true;
        }
        i--;
    }
    if(counter < arrayOfTokens.length)
        until_pattern += SEMI;
    if(repeat_found && r_UNTIL.test(until_pattern))
        acceptance = true
    else
        acceptance =  false   

    return {
        acceptance,
        write_details : acceptance ? '' : 'Check Syntax and "repeat" written before using "until" statement !',
        which_until : how_Many_fn_called++
    };  
}


module.exports = until_rule_tiny_language;
