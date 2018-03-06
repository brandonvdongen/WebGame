import * as mapController from '../modules/mapController.js';

const gamescreen = document.getElementById("gamescreen");
const start_button = document.getElementById("start_button");
let map;

//prepare map variable with map data

start_button.addEventListener("click", () => {
    gamescreen.innerHTML = "";
    mapController.prepare(gamescreen)
        .then((r) => {
            map = r;
            mapController.generateMap(map, gamescreen);
        });

});
