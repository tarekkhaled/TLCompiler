const scanner_job = require('./scanner');
const parser_job = require('./parser');

let _ = {
    counter : 0
}

const full_job = sourceCode => {
    const tokensArray = scanner_job(sourceCode).filter(token => token.tokenType !== 'COMMENT')
    parser_job(sourceCode,tokensArray);
    return tokensArray;
}



module.exports = full_job;