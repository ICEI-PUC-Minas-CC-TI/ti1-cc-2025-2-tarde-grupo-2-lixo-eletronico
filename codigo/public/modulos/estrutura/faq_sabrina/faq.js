   document.addEventListener('DOMContentLoaded', () => {
        fetch('db.json') 
        .then(response => response.json())
        .then(data => { 
            for(let i=0; i<data.faqs.length; i++){
                let faq = data.faqs[i];
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