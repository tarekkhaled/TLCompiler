const  {END,IF} = require("../js/keywords");
let how_Many_fn_called = 1 ;

function end_rule_tiny_language(arrayOfTokens,i) {
    let acceptance ;
    let if_found = false;
    while(i-1 >= -1) {
        let the_if_found_for_this_end = true;
        if(arrayOfTokens[i].tokenType === END) {
            the_if_found_for_this_end = false;
        }
        if(the_if_found_for_this_end && arrayOfTokens[i].tokenType === IF ) {
            if_found = true;
        }
        i--;
    }
    if(if_found)
        acceptance = true
    else
        acceptance =  false   

    return {
        acceptance,
        write_details : acceptance ? '' : 'Check Syntax and "if" written before using "end" statement !',
        which_end : how_Many_fn_called++
    };  
}


module.exports = end_rule_tiny_language;
