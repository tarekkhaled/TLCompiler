/** NEEDED to be done before integration with parser
 * 1) to make tokens array --> array of objects 
 */


const {ipcRenderer} = require('electron')
const c_ = require('./build/Release/scanner')
const fs = require('fs');

let filePath,originalContent ;

/** Select the source code will wb written in the left part of the screen */
const sourceCode = document.querySelector('#source-code');
const tokens = document.querySelector('#tokens');
const openFileButton = document.querySelector('#open-file');
const scanFileButton = document.querySelector('#scan-file');


let tokensArray = [];



const render_tokens_to_screen = sourceCode => {
  /** Here will be my function that take the string and output the tokens */
  if(c_.printString(sourceCode)) {
      tokensArray = fs.readFileSync('./example.txt').toString().split(',');
  }
  tokens.innerHTML = '';
  tokens.appendChild(createTokensTable(tokensArray)) ;
};

scanFileButton.addEventListener('click', event => {
  let currentContent = sourceCode.value;
  if (currentContent.includes("{") && !currentContent.includes("}")) {
    currentContent = currentContent + "}"
  }
  render_tokens_to_screen(currentContent);

});


openFileButton.addEventListener('click',()=>{
    ipcRenderer.send('get-file-from-user')
})


ipcRenderer.on('file-already-chosen' , (event,file,content)=> {
  filePath = file ; 
  originalContent = content;
  sourceCode.value = content ;
  render_tokens_to_screen(content); 
})


/** Here will be my function that take the string and output the tokens */

const createTokensTable = (tokensArray) => {
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

// will be crashed after modified the shape of tokensArray above
const tokensInseration = (tokensArray) => {
  const tokensToShow = [];
  for (let i = 0 ; i < tokensArray.length ; i = i + 2) {
     if (tokensArray[i] === 'Error' && tokensArray[i+1] && !(String(tokensArray[i+1]).trim() == 'is undefined')) {
      tokensToShow.push(tokenRow(tokensArray[i+1],tokensArray[i]));
      break;
    } 
    else if (tokensArray[i] !== 'Error' && tokensArray[i+1] && tokensArray[i-1] !== 'SEMI') {
      tokensToShow.push(tokenRow(tokensArray[i+1],tokensArray[i]));
    }
  
  }
  console.log(tokensToShow)
  return tokensToShow;
}


const tokenRow = (type,value) => {

  const tableFirstRow = document.createElement('tr');
  tableFirstRow.setAttribute('class','tokens-row');
  tableFirstRow.innerHTML = `<td class="type">${type}</td>
                              <td>${value}</td>`
  return tableFirstRow;  
  
}

