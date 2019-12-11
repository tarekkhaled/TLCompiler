const scanner_job = require('./scanner');
const parser_job = require('./parser');

let _ = {
    counter : 0
}

const full_job = sourceCode => {
    const tokensArray = scanner_job(sourceCode);
    parser_job(sourceCode,tokensArray);
}


module.exports = full_job;