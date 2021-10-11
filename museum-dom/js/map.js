mapboxgl.accessToken = 'pk.eyJ1Ijoia3JhbGlzIiwiYSI6ImNrdW1laXRzaTFwa3Eydm96YnQxMnp6eG0ifQ.JTf943mk2tScixKNk9VEQw';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v10',
    center: [2.336219229, 48.860896849],
    zoom: 15.7
});

map.addControl(new mapboxgl.NavigationControl());

map.on('mousemove', (e) => {
    document.getElementById('info').innerHTML =
    JSON.stringify(e.point) +
    '<br />' +
    JSON.stringify(e.lngLat.wrap());
});
const mark1 = new mapboxgl.Marker({
    color: 'gray',
}).setLngLat([2.3327467, 48.8618485])
    .setPopup(
        new mapboxgl.Popup({ offset: 25 })
            .setHTML('<h3>Arc de triomphe du Carrousel</h3>')
    )
    .addTo(map);

const mark2 = new mapboxgl.Marker({
    color: 'gray',
}).setLngLat([2.3364965, 48.8624913])
    .setPopup(
        new mapboxgl.Popup({ offset: 25 })
            .setHTML('<h3>Rue de Rivoli</h3>')
    )
    .addTo(map);

const mark3 = new mapboxgl.Marker({
    color: 'gray',
}).setLngLat([2.33983697, 48.8606411])
    .setPopup(
        new mapboxgl.Popup({ offset: 25 })
            .setHTML('<h3>Sarcophage d\'Abou Roach</h3>')
    )
    .addTo(map);

const mark4 = new mapboxgl.Marker({
    color: 'gray',
}).setLngLat([2.33635, 48.8608235])
    .setPopup(
        new mapboxgl.Popup({ offset: 25 })
            .setHTML('<h3>Louvre Museum</h3>')
    )
    .addTo(map);

const mark5 = new mapboxgl.Marker({
    color: 'gray',
}).setLngLat([2.33306359, 48.86011997])
    .setPopup(
        new mapboxgl.Popup({ offset: 25 })
            .setHTML('<h3>Tunnel des Tulieries</h3>')
    )
    .addTo(map);
