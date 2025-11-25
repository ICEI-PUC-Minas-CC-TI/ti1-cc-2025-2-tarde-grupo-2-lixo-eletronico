const centralLatLong = [-43.9397233, -19.9332786]; // Ponto central do mapa (Belo Horizonte)

let map;

// Função que carrega os dados de unidades da PUC Minas
window.onload = () => {
  montarMapa ();
}

async function montarMapa( ) {
const response = await fetch ('/pontos_de_coleta');
const pontos_de_coleta = await response.json ();
  // Defina o Access Token do Mapbox
   mapboxgl.accessToken = 'pk.eyJ1IjoiMjQwMTA3IiwiYSI6ImNtaWR5bWd3YzAwZHgybXE1am1nMXVrMGQifQ.k4J19OtjH5_O5n4wg_OVQA';
   map = new mapboxgl.Map({
      container: 'map', // O container do mapa
      style: 'mapbox://styles/mapbox/streets-v12', // Estilo do mapa
      center: centralLatLong, // Localização central do mapa
      zoom: 9 // Zoom inicial
   });

   // Adiciona marcadores para cada local
   pontos_de_coleta.forEach((uni) => {
      let popup = new mapboxgl.Popup({ offset: 25 })
      .setHTML(`<br>${uni.nome} <br>${uni.cep} - ${uni.numero}`);
      const marker = new mapboxgl.Marker({ color: uni.cor })
      .setLngLat([uni.longitude, uni.latitude])
      .setPopup(popup)
      .addTo(map);
   });

   // Obtém a localização do usuário e adiciona um marcador
   navigator.geolocation.getCurrentPosition(processarGetCurrentPosition, () => { alert('Erro ao obter localização.') });
}

// Função para processar a localização do usuário
function processarGetCurrentPosition(local) {
   let popup = new mapboxgl.Popup({ offset: 25 })
   .setHTML(`<h3> Estou aqui!!! </h3>`);
   const marker = new mapboxgl.Marker({ color: 'yellow' })
   .setLngLat([local.coords.longitude, local.coords.latitude])
   .setPopup(popup)
   .addTo(map);
}