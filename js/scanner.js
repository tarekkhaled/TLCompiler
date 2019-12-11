/**___________________Scanner :: FIRST PHASE_________________ */
const c_ = require('../build/Release/scanner');
const fs = require('fs');


const scanner_job = sourceCode => {
  if (sourceCode.includes("{") && !sourceCode.includes("}")) {
    sourceCode = sourceCode + "}"
  }
  const regex = /^.+ ?is undefined$/;
  const place_to_render_on = document.querySelector('.rendered-html');
  place_to_render_on.innerHTML = ``;
  const tokens = document.querySelector('#tokens');
  let tokensArray = [];
  /** Here will be my function that take the string and output the tokens */
  if(c_.printString(sourceCode)) {
      const textFromFile = fs.readFileSync('./example.txt').toString().split(',');
      let counter = 0 ; 
      console.log(textFromFile);
      while(counter < textFromFile.length) {
        if(textFromFile[counter+1] && !textFromFile[counter+1].includes('\n'))
        {
          if(textFromFile[counter] === 'Error' && regex.test(textFromFile[counter+1])) {
            tokensArray.push({
              tokenValue : textFromFile[counter],
              tokenType : textFromFile[counter+1]
            })
          } 
          if(textFromFile[counter] !== 'Error') {
            tokensArray.push({
              tokenValue : textFromFile[counter],
              tokenType : textFromFile[counter+1]
            })
          }
        }
        counter += 2;
      }
      console.table(tokensArray);
  }
  

  tokens.innerHTML = '';
  tokens.appendChild(scanner_output(tokensArray)) ;
  return tokensArray ;
};



const scanner_output = (tokensArray) => {
    const parentTable = document.createElement('table');
    parentTable.setAttribute('class','table-tokens')
    const tableFirstRow = document.createElement('tr');
    tableFirstRow.setAttribute('class','tokens-row')
    tableFirstRow.innerHTML = `<th class="type">Tokens Type</th><th>Tokens Value</th>`;
    parentTable.appendChild(tableFirstRow)
    const tokensToShow = tokensInseration(tokensArray);
    tokensToShow.forEach(token => {
      parentTable.appendChild(token)
    })
    return parentTable
}


const tokensInseration = (tokensArray) => {
    const tokensToShow = [];
    for (let i = 0 ; i < tokensArray.length ; i = i + 2) {
        tokensToShow.push(tokenRow(tokensArray[i].tokenType,tokensArray[i].tokenValue));
    }
    return tokensToShow;
}
  
  
const tokenRow = (type,value) => {
  
    const tableFirstRow = document.createElement('tr');
    tableFirstRow.setAttribute('class','tokens-row');
    tableFirstRow.innerHTML = `<td class="type">${type}</td>
                                <td>${value}</td>`
    return tableFirstRow;  
    
}
  

module.exports = scanner_job