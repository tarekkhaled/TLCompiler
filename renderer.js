const {ipcRenderer} = require('electron')
const c_ = require('./build/Release/scanner')
const fs = require('fs');

let filePath,originalContent ;

/** Select the source code will wb written in the left part of the screen */
const sourceCode = document.querySelector('#source-code');
const tokens = document.querySelector('#tokens');
const openFileButton = document.querySelector('#open-file');
const scanFileButton = document.querySelector('#scan-file');


const tokensObject = {
}

let tokensArray = []


const render_tokens_to_screen = sourceCode => {
  /** Here will be my function that take the string and output the tokens */
  scannerJob(sourceCode)
  if(c_.printString(sourceCode)) {
      tokensArray = fs.readFileSync('./example.txt').toString().split(',');
    // console.table(outputFile)
    // let i = 0 ;
    // while (i < outputFile.length) {
    //   const tokenValue = outputFile[i];
    //   Object.defineProperty(tokensObject,tokenValue,{value :outputFile[i+1]})
  
    //   i = i + 2; 
    // }
    // console.table(tokensObject)
  }
  tokens.innerHTML = '';
  tokens.appendChild(createTokensTable(tokensArray)) ;
};

scanFileButton.addEventListener('click', event => {
  const currentContent = sourceCode.value;
  render_tokens_to_screen(currentContent);
});


openFileButton.addEventListener('click',()=>{
    ipcRenderer.send('get-file-from-user')
})


ipcRenderer.on('file-already-chosen' , (event,file,content)=> {
    console.log('erer')
  filePath = file ; 
  console.log(content)
  originalContent = content;
  sourceCode.value = content ;
  render_tokens_to_screen(content); 
})


/** Here will be my function that take the string and output the tokens */

const scannerJob = (sourceCode) => {
  /** Will make the tokens object here */
  return sourceCode
}


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


const tokensInseration = (tokensArray) => {
  const tokensToShow = [];
  console.table(tokensArray)
  for (let i = 0 ; i < tokensArray.length ; i = i + 2) {
    if(tokensArray[i] !== 'Error' && tokensArray[i-1] !== 'SEMI'   && tokensArray[i+1] ) {
      tokensToShow.push(tokenRow(tokensArray[i+1],tokensArray[i]));
    }

  }
  console.dirxml(tokensToShow)
  return tokensToShow;
}


const tokenRow = (type,value) => {

  const tableFirstRow = document.createElement('tr');
  tableFirstRow.setAttribute('class','tokens-row');
  tableFirstRow.innerHTML = `<td class="type">${type}</td>
                              <td>${value}</td>`
  return tableFirstRow;  
  
}

