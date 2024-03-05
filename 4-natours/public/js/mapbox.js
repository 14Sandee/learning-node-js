const locations = JSON.parse(document.getElementById('map').dataset.locations)
console.log(locations)

mapboxgl.accessToken = 'pk.eyJ1IjoiMTRzYW5kZWUiLCJhIjoiY2x0ZTlncDdtMGVmaDJpbW9oM2V4M240YiJ9._kQvPy0yBBof5XHcg7Pddw';

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/14sandee/cltea1158011t01pjdfesdfsq',
    scrollZoom: false
});

const bounds = new mapboxgl.LngLatBounds();

locations.forEach(loc => {
    // Create marker
    const el = document.createElement('div');
    el.className = 'marker';

    // Add marker
    new mapboxgl.Marker({
        element: el,
        anchor: 'bottom'
    }).setLngLat(loc.coordinates).addTo(map);

    // Add popup
    new mapboxgl.Popup({
        offset: 30
    }).setLngLat(loc.coordinates).setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`).addTo(map);

    // Extend map bounds to include current location
    bounds.extend(loc.coordinates);
})

map.fitBounds(bounds, {
    padding: {
        top: 200,
        bottom: 150,
        left: 100,
        right: 100
    }
})