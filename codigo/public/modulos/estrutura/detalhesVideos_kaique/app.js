const apiURL = "http://localhost:3000/videos"; // JSON Server

async function carregarVideos() {
  const resposta = await fetch(apiURL);
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
