let players = [];

class Player_Pawn {
    constructor(color, spawnpoint) {
        this.div = document.createElement("div");
        this.div.style.position = "absolutegi";
        this.div.style.height = "50px";
        this.div.style.width = "50px";
        this.div.style.background = "url('assets/svg/character1-4.svg')";
    }
}


export function preparePlayers(gamescreen_objects) {
    return new Promise((resolve, reject) => {
        if (gamescreen_objects) {
            const player = new Player_Pawn("#ff0000");
            gamescreen_objects.appendChild(player.div);
            players += player;
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

export function takeControl() {
    console.log("starting!");
}