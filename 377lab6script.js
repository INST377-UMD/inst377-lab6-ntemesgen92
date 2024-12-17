function getRandomInRange(from, to, fixed) {
  return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
}

const coordinates = [
  { 
      latitude: getRandomInRange(30, 35, 3), 
      longitude: getRandomInRange(-90, -100, 3) 
  },
  { 
      latitude: getRandomInRange(30, 35, 3), 
      longitude: getRandomInRange(-90, -100, 3) 
  },
  { 
      latitude: getRandomInRange(30, 35, 3), 
      longitude: getRandomInRange(-90, -100, 3) 
  }
];

const map = L.map('map').setView([32.5, -95], 5);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '© OpenStreetMap'
}).addTo(map);


coordinates.forEach((coord, index) => {
  const marker = L.marker([coord.latitude, coord.longitude]).addTo(map);

  fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${coord.latitude}&longitude=${coord.longitude}&localityLanguage=en`)
      .then(response => response.json())
      .then(data => {
          document.getElementById(`marker${index + 1}`).innerText = 
              `${coord.latitude}, ${coord.longitude} - ${data.locality || "Locality not found"}`;
          
          marker.bindPopup(`Marker ${index + 1}: ${data.locality || "Locality not found"}`).openPopup();
      })
      .catch(error => {
          console.error('Error fetching locality:', error);
          document.getElementById(`marker${index + 1}`).innerText = 
              `${coord.latitude}, ${coord.longitude} - Error fetching locality`;
      });
});
