const API_URL = "/materias";
//    Sabrina FAQ - carregar perguntas e respostas do JSON
document.addEventListener("DOMContentLoaded", () => {
  fetch("/faqs")
    .then((response) => response.json())
    .then((data) => {
      for (let i = 0; i < data.length; i++) {
        let faq = data[i];
        const span = document.getElementById(`${faq.id}`);
        if (span) {
          span.textContent = faq.pergunta;
        }
        //sincronizar respostas
        const answer = document.querySelector(`.resposta[data-id="${faq.id}"]`);
        if (answer) {
          answer.textContent = faq.resposta;
        }
      }
    })
    .catch((error) => console.error("Erro ao carregar o arquivo JSON:", error));
});

const accordions = document.querySelectorAll(".accordion");
accordions.forEach((accordion) => {
  accordion.addEventListener("click", () => {
    const body = accordion.querySelector(".accordion-body");
    //tirar e colocar active ao clicar
    body.classList.toggle("active");
  });
});

//    Sabrina MATERIAS - carregar materias do JSON
document.addEventListener("DOMContentLoaded", () => {
  fetch(API_URL)
    .then((response) => response.json())
    .then((data) => {
      for (let i = 0; i < data.length; i++) {
        let materias = data[i];
        // preencher titulo
        const tituloNews = document.getElementById(`${materias.id}`);
        if (tituloNews) tituloNews.textContent = materias.titulo;

        // preecnher autor + data
        const dadosNews = document.querySelector(
          `span[info-id="${materias.id}"]`
        );
        if (dadosNews)
          dadosNews.innerHTML = `${materias.autor} — ${materias.data}`;
        // preencher imagem
        const image = document.querySelector(`img[img-id="${materias.id}"]`);
        if (image) image.src = materias.url;

        // preencher conteudo
        const conteudoNews = document.querySelector(
          `.news[data-id="${materias.id}"]`
        );
        if (conteudoNews) conteudoNews.textContent = materias.conteudo;

        const topico = document.getElementById(`topico-${materias.id}`);
        if (topico) {
          topico.textContent = materias.titulo;
          topico.addEventListener("click", () => {
            // esconde todos os conteúdos
            document
              .querySelectorAll("#content-materias h2")
              .forEach((elem) => {
                elem.classList.remove("active");
              });
            document.querySelectorAll(".news").forEach((elem) => {
              elem.classList.remove("active");
            });
            document
              .querySelectorAll("#content-materias img")
              .forEach((elem) => {
                elem.classList.remove("active");
              });
            document
              .querySelectorAll("#content-materias span")
              .forEach((elem) => {
                elem.classList.remove("active");
              });
            const content = document.querySelector(
              `.news[data-id="${materias.id}"]`
            );
            const titulo = document.querySelector(`h2[id="${materias.id}"]`);
            const imagem = document.querySelector(
              `img[img-id="${materias.id}"]`
            );
            const dadosNews = document.querySelector(
              `span[info-id="${materias.id}"]`
            );

            // exibe todos os conteúdos
            if (titulo) titulo.classList.add("active");
            if (content) content.classList.add("active");
            if (imagem) imagem.classList.add("active");
            if (dadosNews) dadosNews.classList.add("active");
          });
        }

        // mostrar a primeira notícia por padrão
        const FirstTitle = document.querySelector(`h2[id="1"]`);
        const FirstContent = document.querySelector(`.news[data-id="1"]`);
        const FirstImage = document.querySelector(`img[img-id="1"]`);
        const FirstDate = document.querySelector(`span[info-id="1"]`);

        if (FirstTitle) FirstTitle.classList.add("active");
        if (FirstContent) FirstContent.classList.add("active");
        if (FirstImage) FirstImage.classList.add("active");
        if (FirstDate) FirstDate.classList.add("active");
      }
    })

    .catch((error) => console.error("Erro ao carregar o arquivo JSON:", error));
});

//    Samuel Carousel - carregar matérias do backend
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
                        <a href="noticias.html" style="text-decoration: none; color: white;">
                            <img 
                                src="${materia.url}" 
                                class="d-block w-100" 
                                alt="${materia.titulo}" 
                                style="height: ${materia.height}px; object-fit: cover; filter: brightness(0.7);">
                            
                            <div class="carousel-caption d-none d-md-block text-start">
                                <h5>${materia.titulo}</h5>
                                <p>${materia.conteudo.substring(0, 120)}...</p> 
                            </div>
                        </a>
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
// Vídeos - Kaique
async function carregarVideos() {
  const resposta = await fetch("/videos");
  const videos = await resposta.json();

  if (videos.length > 0) {
    mostrarVideoPrincipal(videos[0]);
    listarRelacionados(videos);
  }
}

function mostrarVideoPrincipal(video) {
  document.getElementById("titulo-video").textContent = video.titulo;
  document.getElementById("video-frame").src = video.url;
  document.getElementById("descricao-video").textContent = video.descricao;
  document.getElementById("autor-video").textContent = video.canal;
  document.getElementById("duracao-video").textContent = video.duracao;
}

function listarRelacionados(videos) {
  const lista = document.getElementById("lista-relacionados");
  lista.innerHTML = "";

  videos.slice(1).forEach((v) => {
    const item = document.createElement("div");
    item.classList.add("video-relacionado");

    // miniatura padrão se não tiver thumb
    item.innerHTML =
      //<img src="https://via.placeholder.com/120x80?text=Vídeo" alt="Miniatura">
      `<div>
        <h4>${v.titulo}</h4>
        <p>${v.canal}</p>
      </div>
    `;

    item.addEventListener("click", () => mostrarVideoPrincipal(v));
    lista.appendChild(item);
  });
}

carregarVideos();

// Mecanismo de busca
document.addEventListener("DOMContentLoaded", function () {
  fetch("/pontos_de_coleta")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro na rede: " + response.statusText);
      }
      return response.json();
    })
    .then((pontos) => {
      const searchInput = document.getElementById("searchInput");
      const bairrosbusca = document.getElementById("pills-bairros");
      const ruabusca = document.getElementById("pills-rua");
      const pontodebusca = document.getElementById("pills-filtros");
      function normalizarTexto(texto) {
        return texto
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/[^\w\s]/g, "")
          .trim();
      }
      // Função que filtra o array de pontos
      function filtrarConteudo(searchText) {
        if (!searchText) {
          return pontos; // retorna todos quando não há termo
        }
        // normaliza e separa por espaços
        const termos = normalizarTexto(searchText).split(/\s+/);

        return pontos.filter((item) => {
          const textoItem = normalizarTexto(
            `${item.nome} ${item.logradouro} ${item.bairro} ${item.numero} ${item.estado} ${item.cidade}`
          );

          // TODOS os termos precisam existir no item
          return termos.every((termo) => textoItem.includes(termo));
        });
      }

      // Função que exibe os itens filtrados
      function displayPontos(pontosToDisplay) {
        pontodebusca.innerHTML = "";
        bairrosbusca.innerHTML = "";
        ruabusca.innerHTML = "";

        const listGroup = document.createElement("div");
        listGroup.className = "list-group";
        const listGroupBairros = document.createElement("div");
        listGroupBairros.className = "list-group";
        const listGroupRua = document.createElement("div");
        listGroupRua.className = "list-group";
        pontosToDisplay.forEach((ponto) => {
          // Filtrar os locais dos pontos de coleta(enderecos completos)
          const item = document.createElement("div");
          item.className = "list-group border border-1 rounded-pill filter-tab";
          item.innerHTML = `<div class="p-2">
          <div class="fw-semibold">${ponto.nome}</div>
          <div class="text-muted">- ${ponto.bairro}, n° ${ponto.numero},</div>
          <div class="text-muted"> ${ponto.logradouro}</div>
          </div>
        `;
          // Filtrar os locais dos pontos de coleta(bairros)
          const itemBairros = document.createElement("div");
          itemBairros.className =
            "list-group border border-1 rounded-pill filter-tab";
          itemBairros.innerHTML = `<div class="p-2">
          <div class="text-muted">- ${ponto.bairro}, ${ponto.cidade} -  ${ponto.estado} </div>
          </div>`;
          // Filtrar os locais dos pontos de coleta(ruas)
          const itemRua = document.createElement("div");
          itemRua.className =
            "list-group border border-1 rounded-pill filter-tab";
          itemRua.innerHTML = `<div class="p-2">
          <div class="text-muted">- ${ponto.logradouro}</br> ${ponto.cidade} -  ${ponto.estado} </div>
          </div>`;

          listGroupRua.appendChild(itemRua);
          listGroup.appendChild(item);
          listGroupBairros.appendChild(itemBairros);
        });
        bairrosbusca.appendChild(listGroupBairros);
        ruabusca.appendChild(listGroupRua);
        pontodebusca.appendChild(listGroup);
      }
      // Inicializa exibindo todos
      displayPontos(pontos);

      // Refiltra quando o usuário digita
      searchInput.addEventListener("input", function (e) {
        const termo = e.target.value;
        const filtrados = filtrarConteudo(termo);
        displayPontos(filtrados);
      });
    })
    .catch((err) => {
      console.error("Erro ao carregar pontos:", err);
    });
});
