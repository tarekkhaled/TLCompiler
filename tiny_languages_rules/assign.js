const {r_ASSIGN} = require('../js/regexs');
const  {SEMI} = require("../js/keywords");
let how_Many_fn_called = 1 ;

function assign_rule_tiny_language(arrayOfTokens,i) {
    let acceptance ;
    let counter = i-1 ;
    let assign_pattern = '';
    while(counter < arrayOfTokens.length && arrayOfTokens[counter].tokenType !== SEMI ) {
        if(counter !== i) {
            assign_pattern += arrayOfTokens[counter].tokenType;
        }
        counter++;
    }
    if(counter < arrayOfTokens.length)
        assign_pattern += SEMI;
    if(r_ASSIGN.test(assign_pattern))
        acceptance = true
    else
        acceptance =  false   

    return {
        acceptance,
        assign_details : acceptance ? '' :'Check Syntax for "assign" statement !',
        which_assign : how_Many_fn_called++ 
    }; 
}



module.exports = assign_rule_tiny_language;