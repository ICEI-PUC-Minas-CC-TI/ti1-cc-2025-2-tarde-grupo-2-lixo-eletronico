const apiUrl= '/materias';
function displayMessage(message) {
    const msg = document.getElementById('msg');
    msg.innerHTML = '<div class="alert alert-warning">' + message + '</div>';
}

// LER Materias
function readMaterias(processaDados){
    fetch(apiUrl)
    .then(response =>  response.json()) // pede o JSON
    .then(data => { 
        processaDados(data); // os dados são entregues para a função processaDados
})
    .catch(error => { 
        console.error('Erro ao ler os Materias via API JSONServer: ' + error);
        dysplayMessage('Erro ao ler os Materias');
         })
    }

    // CRIAR Materias
function createMaterias(Materias, refreshFunction){
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(Materias),
    })
    .then(response =>  response.json())
    .then(data => { 
        displayMessage("Materias inserido com sucesso");
        if(refreshFunction)
            refreshFunction();
})
    .catch(error => { 
        console.error('Erro ao inserir o Materias via API JSONServer: ' + error);
        displayMessage('Erro ao inserir o Materias');
         });
    }

// ATUALIZAR Materias
function updateMaterias(id, Materias, refreshFunction){
    fetch(`${apiUrl}/${id}`, {
        method: 'PUT',
        headers: {  
            'Content-Type': 'application/json',
            'Accept-language': 'pt-BR',
            'Accept': 'text/xml',
        },
        body: JSON.stringify(Materias),
    })
    .then(response =>  response.json())
    .then(data=> {
        displayMessage("Materias atualizadas com sucesso");
        if (refreshFunction)
            refreshFunction();
    })
    .catch(error => {
        console.error("Erro ao atualizar API via JSONServer: " + error);    
        displayMessage("Erro ao atualizar as Materias");
    });
}

// EXCLUIR Materias
function deleteMaterias(id, refreshFunction){
    fetch(`${apiUrl}/${id}`, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(data=> {
        displayMessage("Materia removido com sucesso");
        if(refreshFunction)
            refreshFunction();
    })
    .catch(error => {
        console.error("Erro ao remover Materia via API JSONServer:" + error);
        displayMessage("Erro ao remover a Materia");
    });
}