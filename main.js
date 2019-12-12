const {app,BrowserWindow,dialog,ipcMain} = require('electron');
const fs = require('fs')

let mainWindow = null

/* make sure the application is ready */ 
app.on('ready' , () => {
    /* make the window shown to users*/
    mainWindow = new BrowserWindow( {
        show : false
        ,webPreferences : {
            nodeIntegration : true
        },
        width : 955
    })
    
    /* load html in the browser window */
    mainWindow.loadFile(`./index.html`);


    /*  just one time do this listener*/
    mainWindow.once('ready-to-show' , () => {
        mainWindow.show() // make {show :true}
    }) ; 

})

ipcMain.on('get-file-from-user',getFileFromUser)

function getFileFromUser () {
    const files =  dialog.showOpenDialogSync({
        properties : ['openFile'], // allow the file to be selected by user
        filters : [ // filter things he can choose
            // {'name' : 'Text Files', extensions :['txt','text']},
            // {'name' : 'MarkDown Files' , extensions : ['md','markdown','marcdown','mdown']}
        ],
        title : 'Open File you want to scan it !'
    })

    if(!files) return ;  // user open dialog and decide to not choose file
    const file = files[0] ; // the above line doesn't exuected mean that he choose file
    openFile(file)

}

const openFile = file => {
    const content = fs.readFileSync(file).toString();
    app.addRecentDocument(file);
    mainWindow.webContents.send('file-already-chosen',file,content);
    
}


