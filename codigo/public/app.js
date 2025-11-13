
  const API_URL = '/materias';
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

//    Sabrina MATERIAS - carregar materias do JSON
   document.addEventListener('DOMContentLoaded', () => 
    {
        fetch(API_URL) 
        .then(response => response.json())
        .then(data => { 
            for(let i=0; i<data.length; i++){
                let materias = data[i];
                // sincronizar titulos
                const title = document.getElementById(`${materias.id}`);
                if (title) {
                title.textContent = materias.titulo;
                }
                // exibir topicos
                const topico = document.getElementById(`topico-${materias.id}`);
                if (topico) {
                topico.textContent = materias.titulo;
                }
                //sincronizar conteudo
                const content = document.querySelector(`.news[data-id="${materias.id}"]`);
                if(content){
                    content.textContent = materias.conteudo;
                }
            }
            })
              .catch(error => console.error('Erro ao carregar o arquivo JSON:', error));
});



//    Samuel Carousel - carregar matérias do backend
document.addEventListener('DOMContentLoaded', function() {

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
