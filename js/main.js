import * as mapController from '../modules/mapController.js';

const gamescreen = document.getElementById("gamescreen");
let map;

//prepare map variable with map data
mapController.prepare(gamescreen)
    .then((r) => {
        map = r;
        mapController.drawMap(map,gamescreen);
    });
