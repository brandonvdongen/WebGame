import {getKeyBind} from "./keyBind.js";
import {getMap,getSpawnPoints} from "./mapController.js";

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
}

class Player_Pawn {
    constructor(color, spawnpoint = {x: 0, y: 0}) {
        this.x = spawnpoint.x || 0;
        this.y = spawnpoint.y || 0;
        this.div = document.createElement("div");
        this.div.style.position = "absolutegi";
        this.div.style.height = "50px";
        this.div.style.width = "50px";
        this.div.style.position = "relative";
        this.div.style.background = "url('assets/svg/character1-4.svg')";
    }
}


export function preparePlayers(gamescreen_objects) {
    return new Promise((resolve, reject) => {
        if (gamescreen_objects) {
            const player = new Player_Pawn("#ff0000");
            gamescreen_objects.appendChild(player.div);
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
    document.addEventListener("keydown", (ev) => {
        const button = getKeyBind(ev.code);
        if (!controls[button]) {
            controls[button] = 1;

            if (button === "up1") {
                players[0].y -= 1;
            }
            else if (button === "down1") {
                players[0].y += 1;
            }
            else if (button === "left1") {
                players[0].x -= 1;
            }
            else if (button === "right1") {
                players[0].x += 1;
            }

            players.forEach((player, index) => {
                player.div.style.top = player.y * 50 + "px";
                player.div.style.left = player.x * 50 + "px";
            })

        }
    });

    document.addEventListener("keyup", (ev) => {
        const button = getKeyBind(ev.code);
        if (controls[button]) {
            controls[button] = 0;
        }
    });

}