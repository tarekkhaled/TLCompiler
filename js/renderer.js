/** NEEDED to be done before integration with parser
 * use event delegation in the future to reduce event listeneres on navbar*/

const {ipcRenderer} = require('electron');
const scanner_job = require('./scanner');
const parser_job = require('./parser');
const full_job = require('./full');
const toggle_checkbox = require('./checkboxs');


/** Select the source code will wb written in the left part of the screen */
const sourceCode = document.querySelector('#source-code');
const openFileButton = document.querySelector('#open-file');
const scanFileButton = document.querySelector('#scan-file');
const parserFileButton = document.querySelector('#parse-file');
const fullFileButton = document.querySelector('#full-file');
const checkboxCircle = document.querySelectorAll('.toggle');


checkboxCircle.forEach(circle => circle.addEventListener('click',toggle_checkbox));


/**______________________Navbar Features____________________ */

// Scanner JOB
scanFileButton.addEventListener('click', e  => {
  let currentContent = sourceCode.value;
  if(!currentContent) 
    alert('Enter code or  Choose file first !!')
  else {
    if (currentContent.includes("{") && !currentContent.includes("}")) {
      currentContent = currentContent + "}"
    }
    scanner_job(currentContent);
  }
});

// Parser JOB
parserFileButton.addEventListener('click',e => {
  let currentContent = sourceCode.value;
  if(!currentContent) 
    alert('Enter code or Choose file first !!')
  else {
    const tokens = parser_job(currentContent);
    document.querySelector('.parser-tree').addEventListener('click',()=>{
      ipcRenderer.send('openNewWindow',tokens)
    })
  }
})

// Full JOB
fullFileButton.addEventListener('click',e => {
  let currentContent = sourceCode.value;
  if(!currentContent)
    alert('Enter code or Choose file first !!');
  else {
    const tokens = full_job(currentContent);
    document.querySelector('.parser-tree').addEventListener('click',()=>{
      ipcRenderer.send('openNewWindow',tokens)
    })
  }
})

openFileButton.addEventListener('click',()=>{
    ipcRenderer.send('get-file-from-user')
})




/** when fire will be selected this function will be executed  */
ipcRenderer.on('file-already-chosen' , (event,file,content)=> {
  filePath = file ; 
  originalContent = content;
  sourceCode.value = content ;
  const who_is_active = document.querySelector('.active').classList[1];
  what_should_i_show_with_that_file(who_is_active,content)
})



const what_should_i_show_with_that_file = (active,content) => {
  switch (active) {
    case 'inner-scanner':
      scanner_job(content);
      break;
    case 'inner-parser':
      const tokens = parser_job(content);
      document.querySelector('.parser-tree').addEventListener('click',()=>{
        ipcRenderer.send('openNewWindow',tokens)
      })
      break;
    case 'inner-full':
       const full_tokens = full_job(content);
       document.querySelector('.parser-tree').addEventListener('click',()=>{
          ipcRenderer.send('openNewWindow',full_tokens)
      })
      break;
    default:
      break;
  }
}




