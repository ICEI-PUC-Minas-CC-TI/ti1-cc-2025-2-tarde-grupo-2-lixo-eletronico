const apiUrl= '/pontos_de_coleta';

function displayMessage(message) {
    const msg = document.getElementById('msg');
    msg.innerHTML = '<div class="alert alert-warning">' + message + '</div>';
}

// LER PONTOS DE COLETA
function readPontosDeColeta(processaDados){
    fetch(apiUrl)
    .then(response =>  response.json()) // pede o JSON
    .then(data => { 
        processaDados(data); // os dados são entregues para a função processaDados
})
    .catch(error => { 
        console.error('Erro ao ler os pontos de coleta via API JSONServer: ' + error);
        dysplayMessage('Erro ao ler os pontos de coleta');
         })
    }

    // CRIAR PONTOS DE COLETA
function createPontosDeColeta(PontosDeColeta, processaDados){
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(PontosDeColeta),
    })
    .then(response =>  response.json())
    .then(data => { 
        displayMessage("Ponto de coleta inserido com sucesso");
        if(refreshFunction)
            refreshFunction();
})
    .catch(error => { 
        console.error('Erro ao inserir o ponto de coleta via API JSONServer: ' + error);
        dysplayMessage('Erro ao inserir o ponto de coleta');
         });
    }

// ATUALIZAR PONTOS DE COLETA
function updatePontosDeColeta(id, PontosDeColeta, refreshFunction){
    fetch(`${apiUrl}/${id}`, {
        method: 'PUT',
        headers: {  
            'Content-Type': 'application/json',
            'Accept-language': 'pt-BR',
            'Accept': 'text/xml',
        },
        body: JSON.stringify(PontosDeColeta),
    })
    .then(response =>  response.json())
    .then(data=> {
        displayMessage("Pontos de coleta atualizado com sucesso");
        if (refreshFunction)
            refreshFunction();
    })
    .catch(error => {
        console.error("Erro ao atualizar API via JSONServer: " + error);    
        displayMessage("Erro ao atualizar os pontos de coleta");
    });
}

// EXCLUIR PONTOS DE COLETA
function deletePontosDeColeta(id, refreshFunction){
    fetch(`${apiUrl}/${id}`, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(data=> {
        displayMessage("ponto de coleta removido com sucesso");
        if(refreshFunction)
            refreshFunction();
    })
    .catch(error => {
        console.error("Erro ao remover ponto de coleta via API JSONServer:" + error);
        displayMessage("Erro ao remover o ponto de coleta");
    });
}