const tiny_language_acceptance = require('../tiny_languages_grammer/program');

const _ = {
    counter : 0
}

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
                tokenType : line.split(',')[1].trim() === 'SEMICOLON' ? 'SEMI' : line.split(',')[1].trim()
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
                tokenType : line.split(',')[1].trim() === 'SEMICOLON' ? 'SEMI' : line.split(',')[1].trim()
            })
        }
    }
    return tokensArray;
}

const parser_job = (sourceCode,tokesnOb = '',) => {
    _.counter = 0;
    const place_to_render_on = document.querySelector('.rendered-html');
    place_to_render_on.innerHTML = ``;
    let  tokensArray;
    if(!tokesnOb) {
        tokensArray = prepare_tokensArray_for_parsing_it(sourceCode).filter(token => token.tokenType !== "COMMENT")
    }
    else 
        tokensArray = tokesnOb;
    const acceptance = tiny_language_acceptance(tokensArray,_);
    _.counter = 0 ;
    place_to_render_on.innerHTML = `<div class="card">
        <h3>Tiny Language Statue :</h3>
        <div class="card-info">
            <img src=${acceptance ? './img/true.png' : './img/false.png'} />
            <p>${acceptance ? 'This code is accepted' : 'This code is not accepted'}</p>
            ${acceptance ? '<button class="parser-tree">Parser Tree</button>' : null}
        </div>
    </div>`
    return tokensArray;
}

module.exports = parser_job;

