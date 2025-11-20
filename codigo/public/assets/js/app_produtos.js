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
    });
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
    });
}

//update
function createProduto(produto, refreshFunction){
    fetch(apiUrl,{
        method:'PUT',
        headers: {'Content-Type':'application/json'},
        body:JSON.stringify(produto),
    })
    .then(response => response.json())
    .then(data => {
        displayMessage("Produto atualizado com sucesso!");
        if(refreshFunction) refreshFunction();
    })
    .catch(error => {
        console.error('Erro:', error);
        displayMessage('Erro ao atualizar o produto', 'danger');
    });
}

//delete
function deleteProduto(id, refreshFunction){
    fetch(`${apiUrl}/${id}`, {
        method: 'DELETE',
    })
    .then(response => {
        if(response.ok) {
        displayMessage("Produto removido com sucesso!");
        if(refreshFunction) refreshFunction();
    }
    })
    .catch(error => {
        console.error('Erro', error);
        displayMesssage('Erro ao remover produto', 'danger');
    });
}

//DOM
function exibirProdutos(){
    const tableProdutos = document.getElementById("table-produtos");
    tableProdutos.innerHTML = "";

    readProduto(dados => {
        dados.forEach(produto => {
            tableProdutos.innerHTML += `
            <tr data-id="${produto.id}" style="cursor: pointer">
                <td>${produto.id}</td>
                <td>${produto.nome}</td>
            </tr>`;
        });
    });
}

function limparForm() {
    const formProduto = document.getElementById("form-produto");
    const inputId = document.getElementById("inputId");

    formProduto.reset();
    inputId.value = "";

    document.getElementById("btnInsert").disabled = false;
    document.getElementById("btnUpdate").disabled = true;
    document.getElementById("btnDelete").disabled = true;
}

function init(){
    const formProduto = document.getElementById("form-produto");
    const inputId = document.getElementById("inputId");
    const inputNome = document.getElementById("inputNome");

    const btnInsert = document.getElementById("btnInsert");
    const btnUpdate = document.getElementById("btnUpdate");
    const btnDelete = document.getElementById("btnDelete");
    const btnClear = document.getElementById("btnClear");
    const gridProdutos = document.getElementById("grid-produtos");

    //botão inserir
    btnInsert.addEventListener("click", function () {
        if(!formProduto.checkValidity()){
            displayMessage("Preencha o nome do produto.", 'warning');
            return;
        }
        let produto = {nome: inputNome.value};
        createProduto(produto, () => {
            exibirProdutos();
            limparForm();
        });
    });

    //botão alterar 
    btnUpdate.addEventListener("click", function (){
        let id = inputId.value;
        if(!id) return;

        let produto = {nome: inputNome.value};
        updateProduto(id, produto, () => {
            exibirProdutos();
            limparForm();
        });
    });

    //botão excluir
    btnDelete.addEventListener("click", function(){
        let id = inputId.value;
        if (!id) return;

        if(confirm('Tem certeza que deseja excluir o produto?')){
            deleteProduto(id, () => {
                exibirProdutos();
                limparForm();
            });
        }
    });

    //botão limpar
    btnClear.addEventListener("click", limparForm);

    gridProdutos.addEventListener("click", function (e){
        const linha = e.target.closest('tr');

        if(linha && linha.parentElement.id === "table-produtos"){
            const colunas = linha.querySelectorAll("td");
            inputId.value = colunas[0].innerText;
            inputNome.value = colunas[1].innerText;

            btnInsert.disabled = true;
            btnUpdate.disabled = false;
            btnDelete.disabled = false;
        }
    });
    exibirProdutos();
}

document.addEventListener("DOMContentLoaded", init);