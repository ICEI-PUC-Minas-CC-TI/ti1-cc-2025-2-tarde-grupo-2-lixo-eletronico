// Trabalho Interdisciplinar 1 - Aplicações Web
//
// Esse módulo implementa uma API RESTful baseada no JSONServer
// O servidor JSONServer fica hospedado na seguinte URL
// https://jsonserver.rommelpuc.repl.co/contatos
//
// Para montar um servidor para o seu projeto, acesse o projeto 
// do JSONServer no Replit, faça o FORK do projeto e altere o 
// arquivo db.json para incluir os dados do seu projeto.
//
// URL Projeto JSONServer: https://replit.com/@rommelpuc/JSONServer
//
// Autor: Rommel Vieira Carneiro
// Data: 03/10/2023

document.addEventListener('DOMContentLoaded', function() {
    
    
    const API_URL = 'http://localhost:3000/materias';

    
    fetch(API_URL)
        .then(response => {
            
            if (!response.ok) {
                throw new Error('Erro na rede: ' + response.statusText);
            }
            return response.json();
        })
        .then(materias => {
            

            const indicatorsContainer = document.getElementById('carousel-indicators-container');
            const innerContainer = document.getElementById('carousel-inner-container');

            indicatorsContainer.innerHTML = '';
            innerContainer.innerHTML = '';

            materias.forEach((materia, index) => {
                const isActive = index === 0;

                const indicatorHTML = `
                    <button 
                        type="button" 
                        data-bs-target="#carouselDestaques" 
                        data-bs-slide-to="${index}" 
                        class="${isActive ? 'active' : ''}" 
                        aria-current="${isActive ? 'true' : 'false'}" 
                        aria-label="Slide ${index + 1}">
                    </button>
                `;
                
                const itemHTML = `
                    <div class="carousel-item ${isActive ? 'active' : ''}">
                        <img 
                            src="${materia.url}" 
                            class="d-block w-100" 
                            alt="${materia.titulo}" 
                            style="height: ${materia.height}px; object-fit: cover; filter: brightness(0.7);">
                        
                        <div class="carousel-caption d-none d-md-block text-start">
                            <h5>${materia.titulo}</h5>
                            <p>${materia.conteudo.substring(0, 120)}...</p> 
                        </div>
                    </div>
                `;

                indicatorsContainer.innerHTML += indicatorHTML;
                innerContainer.innerHTML += itemHTML;
            });
        })
        .catch(error => {
            
            console.error('Falha ao buscar matérias:', error);
            
            const innerContainer = document.getElementById('carousel-inner-container');
            if (innerContainer) {
                innerContainer.innerHTML = '<p class="text-danger text-center">Não foi possível carregar as notícias. Tente novamente mais tarde.</p>';
            }
        });
});