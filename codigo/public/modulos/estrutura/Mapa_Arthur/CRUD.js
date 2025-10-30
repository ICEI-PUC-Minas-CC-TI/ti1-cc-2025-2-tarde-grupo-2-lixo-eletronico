// URL da API JSONServer - Substitua pela URL correta da sua API
const apiUrl = 'http://localhost:3000/pontos_de_coleta';

/**
 * Exibe uma mensagem na tela
 */
function displayMessage(mensagem) {
    const msg = document.getElementById('msg');
    msg.innerHTML = `<div class="alert alert-warning">${mensagem}</div>`;
    
    // Remove a mensagem após 3 segundos
    setTimeout(() => {
        msg.innerHTML = '';
    }, 3000);
}

/**
 * Lê os pontos de coleta da API
 */
function readContato(processaDados) {
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na rede: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            processaDados(data);
        })
        .catch(error => {
            console.error('Erro ao ler pontos de coleta via API JSONServer:', error);
            displayMessage('Erro ao carregar pontos de coleta. Verifique se o JSON Server está rodando.');
        });
}

// ... restante do código permanece igual