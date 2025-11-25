const apiUrl = "http://localhost:3000/videos";

function displayMessage(message) {
  const msg = document.getElementById("msg");
  msg.innerHTML = '<div class="alert alert-warning">' + message + "</div>";
}

// LER Vídeos
function readVideosMateria(processaDados) {
  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) throw new Error("Resposta não OK: " + response.status);
      return response.json();
    })
    .then((data) => {
      processaDados(data);
    })
    .catch((error) => {
      console.error("Erro ao ler os videos via API JSONServer: " + error);
      displayMessage("Erro ao ler os vídeos");
    });
}

// CRIAR Vídeo
function createVideosMateria(VideosMateria, refreshFunction) {
  fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(VideosMateria),
  })
    .then((response) => {
      if (!response.ok) throw new Error("POST falhou: " + response.status);
      return response.json();
    })
    .then((data) => {
      displayMessage("Vídeo inserido com sucesso");
      if (refreshFunction) refreshFunction(); // chama a função de refresh passada
    })
    .catch((error) => {
      console.error("Erro ao inserir o vídeo via API JSONServer: " + error);
      displayMessage("Erro ao inserir o vídeo");
    });
}

// ATUALIZAR VÍDEO
function updateVideosMateria(id, VideosMateria, refreshFunction) {
  fetch(`${apiUrl}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(VideosMateria),
  })
    .then((response) => {
      if (!response.ok) throw new Error("PUT falhou: " + response.status);
      return response.json();
    })
    .then((data) => {
      displayMessage("Vídeo atualizado com sucesso");
      if (refreshFunction) refreshFunction();
    })
    .catch((error) => {
      console.error("Erro ao atualizar API via JSONServer: " + error);
      displayMessage("Erro ao atualizar o vídeo");
    });
}

// EXCLUIR VÍDEO
function deleteVideosMateria(id, refreshFunction) {
  fetch(`${apiUrl}/${id}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) throw new Error("DELETE falhou: " + response.status);
      // json-server retorna {} para delete; apenas atualiza
      displayMessage("Vídeo removido com sucesso");
      if (refreshFunction) refreshFunction();
    })
    .catch((error) => {
      console.error("Erro ao remover o vídeo via API JSONServer: " + error);
      displayMessage("Erro ao remover o vídeo");
    });
}
