import * as mapController from '../modules/mapController.js';
import * as playerModule from '../modules/playerModule.js';

const gamescreen_tiles = document.getElementById("gamescreen_tiles");
const gamescreen_objects = document.getElementById("gamescreen_objects");
const start_button = document.getElementById("start_button");
let map;

//prepare map variable with map data

start_button.addEventListener("click", () => {
    gamescreen_tiles.innerHTML = "";
    mapController.prepare(gamescreen_tiles)
        .then((r) => {
            map = r;
            mapController.generateMap(map, gamescreen_tiles).then((map) => {
                playerModule.preparePlayers(gamescreen_objects).then(() => {
                    playerModule.preparePlayers(gamescreen_objects).then(() => {
                        playerModule.takeControl(map);
                    });
                });
            });
        });

});
