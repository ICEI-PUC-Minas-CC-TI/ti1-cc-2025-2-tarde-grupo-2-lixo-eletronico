//    Sabrina FAQ - carregar perguntas e respostas do JSON
   document.addEventListener('DOMContentLoaded', () => 
    {
        fetch('/faqs') 
        .then(response => response.json())
        .then(data => { 
            for(let i=0; i<data.length; i++){
                let faq = data[i];
                const span = document.getElementById(`${faq.id}`);
                if (span) {
                span.textContent = faq.pergunta;
                }
                //sincronizar respostas
                const answer = document.querySelector(`.resposta[data-id="${faq.id}"]`);
                if(answer){
                    answer.textContent = faq.resposta;
                }
            }
            })
              .catch(error => console.error('Erro ao carregar o arquivo JSON:', error));
});

        const accordions = document.querySelectorAll('.accordion');
        accordions.forEach(accordion => {
            accordion.addEventListener('click', () => {
               const body= accordion.querySelector('.accordion-body');
               //tirar e colocar active ao clicar
               body.classList.toggle('active');
            });
        });

document.addEventListener('DOMContentLoaded', function() {
    
// Samuel Carrossel - carregar matérias do JSON
    const API_URL = '/materias';
    
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
// Bernardo/Pesquisa
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search');
    const items = document.querySelectorAll('.item');
    const noResults = document.getElementById('no_results');
    const resultsList = document.querySelector('.items');

    // Função para filtrar os resultados
    function filterResults() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        let visibleItems = 0;

        items.forEach(item => {
            const searchData = item.getAttribute('data-search').toLowerCase();
            const title = item.querySelector('.item-title').textContent.toLowerCase();
            const subtitle = item.querySelector('.item-subtitle').textContent.toLowerCase();
            const description = item.querySelector('.item-description').textContent.toLowerCase();

            // Verifica se o termo de busca está em qualquer um dos campos
            const matches = searchData.includes(searchTerm) || 
                           title.includes(searchTerm) || 
                           subtitle.includes(searchTerm) || 
                           description.includes(searchTerm);

            if (matches || searchTerm === '') {
                item.style.display = 'flex';
                visibleItems++;
            } else {
                item.style.display = 'none';
            }
        });

        // Mostra ou esconde a mensagem de nenhum resultado
        if (visibleItems === 0 && searchTerm !== '') {
            noResults.style.display = 'block';
            resultsList.style.display = 'none';
        } else {
            noResults.style.display = 'none';
            resultsList.style.display = 'flex';
        }
    }

    // Event listener para o input de busca
    searchInput.addEventListener('input', filterResults);

    // Event listener para a tecla Escape
    searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            searchInput.value = '';
            filterResults();
            searchInput.blur();
        }
    });

    // Focar no input quando a página carregar
    searchInput.focus();

    console.log('Sistema de busca inicializado! Digite "kakkkfuhsfguhsiu" para testar.');
});