// Token do Mapbox
mapboxgl.accessToken = 'pk.eyJ1IjoiMjQwMTA3IiwiYSI6ImNtaDZzMWZlNDBtNWcybHEydmY2ajR3ZXIifQ.Njgm2pelhhzhpYrKMXOq5w';

// Inicializar mapa
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v12',
  center: [-47.8825, -15.7942], // Centro aproximado do Brasil
  zoom: 4.2
});

// Carregar
fetch('db.json')
  .then(response => response.json())
  .then(data => {
    const lista = document.getElementById('listaPontos');

    data.pontos.forEach(ponto => {
      // Adicionar
      new mapboxgl.Marker({ color: '#4caf50' })
        .setLngLat([ponto.longitude, ponto.latitude])
        .setPopup(new mapboxgl.Popup().setHTML(`
          <strong>${ponto.nome}</strong><br>${ponto.endereco}
        `))
        .addTo(map);

      // Criar
      const card = document.createElement('div');
      card.classList.add('card');
      card.innerHTML = `
        <h4>${ponto.nome}</h4>
        <p>${ponto.endereco}</p>
        <p><strong>Latitude:</strong> ${ponto.latitude}</p>
        <p><strong>Longitude:</strong> ${ponto.longitude}</p>
      `;
      lista.appendChild(card);
    });
  })
  .catch(err => console.error('Erro ao carregar db.json:', err));
