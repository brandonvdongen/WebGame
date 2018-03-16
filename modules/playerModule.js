import {getKeyBind} from "../modules/keyBind.js";
import {spawnpoints} from "../modules/mapController.js";
import {placeBomb} from "./bombController.js";

let players = [];

let controls = {
    up1: 0,
    left1: 0,
    down1: 0,
    right1: 0,
    bomb1: 0,
    up2: 0,
    left2: 0,
    down2: 0,
    right2: 0,
    bomb2: 0
};
let gamescreen;
let walkable = ["EMPTY", "PICKUP"];

class Player_Pawn {
    constructor(color, spawnpoint = {x: 0, y: 0}) {
        this.x = spawnpoint.x || 1;
        this.y = spawnpoint.y || 1;
        this.div = document.createElement("div");
        this.div.classList.add("player");
    }
}

function collision(player, map, id) {
    let collided = false;
    players.forEach((target, index) => {
        if (index !== id) {
            if (player.x === target.x && player.y === target.y) {
                console.log("collision!");
                collided = true;
            }
        }

    });
    if (collided) return true;
    return walkable.indexOf(map[player.y][player.x].type) === -1;

}

export function preparePlayers(gamescreen_objects) {
    gamescreen = gamescreen_objects;
    return new Promise((resolve, reject) => {
        if (gamescreen_objects) {
            const player = new Player_Pawn("#ff0000");
            gamescreen_objects.appendChild(player.div);
            player.x = spawnpoints[players.length][0];
            player.y = spawnpoints[players.length][1];
            player.div.style.background = "url('assets/svg/character" + (players.length + 1) + ".svg')";
            players.push(player);
            resolve(players);
        }
        else {
            if (!map) {
                reject(Error("no map loaded"));
            }
            if (!gamescreen_objects) {
                reject(Error("gamescreen_tiles does not exist"));
            }
        }

    });
}

export function takeControl(map) {
    movement("update", map);
    document.addEventListener("keydown", (ev) => {
        const button = getKeyBind(ev.code) || "none";
        if (controls[button] === 0) {
            controls[button] = 1;
            const id = button.slice(-1);
            if (button === "bomb" + id) {
                const position = {x: players[id - 1].x, y: players[id - 1].y};
                placeBomb(position, map, gamescreen, players);
            } else {
                movement(button, map);
            }

        }
    });

    document.addEventListener("keyup", (ev) => {
        const button = getKeyBind(ev.code);
        if (controls[button] === 1) {
            controls[button] = 0;
        }
    });

}


function movement(button, map) {
    if (button && map) {
        const id = button.slice(-1);
        if (button === "up" + id) {
            players[id - 1].y -= 1;
            if (collision(players[id - 1], map, id - 1)) {
                players[id - 1].y += 1;
            }
        }
        else if (button === "down" + id) {
            players[id - 1].y += 1;
            if (collision(players[id - 1], map, id - 1)) {
                players[id - 1].y -= 1;
            }
        }
        else if (button === "left" + id) {
            players[id - 1].x -= 1;
            if (collision(players[id - 1], map, id - 1)) {
                players[id - 1].x += 1;
            }
        }
        else if (button === "right" + id) {
            players[id - 1].x += 1;
            if (collision(players[id - 1], map, id - 1)) {
                players[id - 1].x -= 1;
            }
        }
        players.forEach((player, index) => {
            player.div.style.top = player.y * 50 + "px";
            player.div.style.left = player.x * 50 + "px";
        });
    }
}

