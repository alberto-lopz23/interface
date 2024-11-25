// Crear el mapa
var map = L.map('map').setView([40.7127753, -74.0059721], 13); // Coordenadas iniciales en Nueva York

// Añadir capa de OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Crear el geocodificador (Nominatim) para búsqueda
var geocoder = L.Control.Geocoder.nominatim({
    geocodingQueryParams: {
        countrycodes: 'ES',  // Limitar la búsqueda a España (puedes quitar esto si buscas en todo el mundo)
        limit: 5  // Limitar los resultados a 5
    }
});

// Agregar barra de búsqueda al mapa
L.Control.geocoder({
    collapsed: false,  // Mostrar barra de búsqueda expandida por defecto
    placeholder: "Buscar ciudad o lugar",
    geocoder: geocoder
}).addTo(map);

// Escuchar la búsqueda desde la caja de texto de tu HTML
document.getElementById('search-box').addEventListener('input', function(e) {
    var query = e.target.value;  // Obtener el texto del input

    if (query.length > 2) {  // Comenzar a buscar cuando el usuario escribe al menos 3 caracteres
        geocoder.geocode(query, function(results) {
            if (results.length > 0) {
                var result = results[0];  // Tomar el primer resultado
                var latLng = result.center;  // Obtener la latitud y longitud del lugar

                // Centrar el mapa en la ubicación
                map.setView(latLng, 13);

                // Añadir un marcador en la ubicación
                L.marker(latLng).addTo(map)
                    .bindPopup(result.name)  // Mostrar el nombre del lugar en el popup
                    .openPopup();
            }
        });
    }
});
