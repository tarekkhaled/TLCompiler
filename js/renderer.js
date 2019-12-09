/** NEEDED to be done before integration with parser
 * 1) to make tokens array --> array of objects */

const {ipcRenderer} = require('electron');
const {scanner_output} = require('./scanner');
const toggle_checkbox = require('./checkboxs');
const c_ = require('../build/Release/scanner');
const fs = require('fs');


/** Select the source code will wb written in the left part of the screen */
const sourceCode = document.querySelector('#source-code');
const tokens = document.querySelector('#tokens');
const openFileButton = document.querySelector('#open-file');
const scanFileButton = document.querySelector('#scan-file');
const checkboxCircle = document.querySelectorAll('.toggle');


let tokensArray = [];


/**___________________Scanner :: FIRST PHASE_________________ */
const render_tokens_to_screen = sourceCode => {
  /** Here will be my function that take the string and output the tokens */
  if(c_.printString(sourceCode)) {
      tokensArray = fs.readFileSync('./example.txt').toString().split(',');
  }
  tokens.innerHTML = '';
  tokens.appendChild(scanner_output(tokensArray)) ;
};


/**______________________Navbar Features____________________ */

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

checkboxCircle.forEach(circle => circle.addEventListener('click',toggle_checkbox));

/** when fire will be selected this function will be executed  */
ipcRenderer.on('file-already-chosen' , (event,file,content)=> {
  filePath = file ; 
  originalContent = content;
  sourceCode.value = content ;
  render_tokens_to_screen(content); 
})



