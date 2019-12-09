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
  

module.exports = {
    scanner_output
}