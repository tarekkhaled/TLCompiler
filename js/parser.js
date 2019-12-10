const read_rule_tiny_language = require('../tiny_languages_rules/read');
const write_rule_tiny_language = require('../tiny_languages_rules/write');
const assign_rule_tiny_language = require('../tiny_languages_rules/assign');
const until_rule_tiny_language = require('../tiny_languages_rules/until');
const repeat_rule_tiny_language = require('../tiny_languages_rules/repeat');
const if_rule_tiny_language = require('../tiny_languages_rules/if');
const end_rule_tiny_language = require('../tiny_languages_rules/end');
const  {
    READ,
    WRITE,
    ASSIGN,
    UNTIL,
    REPEAT,
    IF,
    END
} = require("./keywords");


const prepare_tokensArray_for_parsing_it = sourceCode => {
    let tokensArray = [];
    let counter = 0 ;
    for(let i = 0 ; i < sourceCode.length ; i++) {
        if(sourceCode[i] === '\n') {
            let line = '';
            while (counter < i) {
                line += sourceCode[counter];
                counter++;
            }
            counter++;
            tokensArray.push({
                tokenValue : line.split(',')[0],
                tokenType : line.split(',')[1] === 'SEMICOLON' ? 'SEMI' : line.split(',')[1]
            })
        }
        if(i === sourceCode.length - 1) {
            let line = '';
            while (counter <= i) {
                line += sourceCode[counter];
                counter++;
            }
            counter++;
            tokensArray.push({
                tokenValue : line.split(',')[0],
                tokenType : line.split(',')[1] === 'SEMICOLON' ? 'SEMI' : line.split(',')[1]
            })
        }
    }
    return tokensArray;
}

const tiny_language_acceptance = arrayOfTokens => {
    let acceptance = [] ;
    for(let i = 0 ; i < arrayOfTokens.length ; i++) {
        switch (arrayOfTokens[i].tokenType) {
            case READ:
                acceptance.push(read_rule_tiny_language(arrayOfTokens,i));
            break;
            case WRITE:
                acceptance.push(write_rule_tiny_language(arrayOfTokens,i));
            break;
            case IF:
                acceptance.push(if_rule_tiny_language(arrayOfTokens,i));
            break;
            case END:
                acceptance.push(end_rule_tiny_language(arrayOfTokens,i))
            break;
            case ASSIGN:
                acceptance.push(assign_rule_tiny_language(arrayOfTokens,i));
            break;
            case UNTIL:
                acceptance.push(until_rule_tiny_language(arrayOfTokens,i));
            break;
            case REPEAT:
                acceptance.push(repeat_rule_tiny_language(arrayOfTokens,i));
            break;
            default:
            break;
        }
    }
    return acceptance ;
}

const parser_job = (sourceCode) => {
    const place_to_render_on = document.querySelector('.rendered-html');
    place_to_render_on.innerHTML = ``;
    const tokensArray = prepare_tokensArray_for_parsing_it(sourceCode);
    const acceptance = tiny_language_acceptance(tokensArray);
    let accepted = true;
    acceptance.forEach(obj => {
        accepted = accepted && obj.acceptance
    });
    // show the result of parser into screen
}



module.exports = parser_job;

