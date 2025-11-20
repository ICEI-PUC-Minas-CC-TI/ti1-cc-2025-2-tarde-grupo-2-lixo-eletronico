const apiUrl = '/produtos';

function displayMessage(mensagem, tipo ='succes'){
    const msg = document.getElementById('msg');
    msg.innerHTML=`<div class="alert alert-${tipo}">${mensagem}</div>`;
    setTimeout(()=>{msg.innerHTML = '';}, 5000);
}
//funções CRUD

//read
function readProduto(processaDados){
    fetch(apiUrl)
    .then(response => response.json())
    .then(data => processaDados(data))
    .catch(error => {
        console.error('Erro ao ler produtos:', error);
        displayMessage('Erro ao ler produtos', 'danger');
    })
}

//create
function createProduto(produto, refreshFunction){
    fetch (apiUrl, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(produto),
    })
    .then(response => response.json())
    .then(data => {
        displayMessage("Produto inserido com sucesso!");
        if (refreshFunction) refreshFunction();
    })
    .catch(error => {
        console.error('Erro:', error);
        displayMessage('Erro ao inserir produto', 'danger');
    })
}
