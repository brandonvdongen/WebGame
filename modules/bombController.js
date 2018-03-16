import {setTileType} from "./mapController.js";

export function placeBomb(position, map, gamescreen, players) {
    const bomb = new Bomb(position, map, gamescreen);
    setTimeout(() => {
        bomb.explode(players);
    }, 3000);
}


class Bomb {
    constructor(position, map, gamescreen) {
        this.position = JSON.parse(JSON.stringify(position));
        this.map = map;
        this.gamescreen = gamescreen;
        this.div = document.createElement("div");
        this.div.style.background = "url('assets/svg/bom.svg')";
        this.div.style.top = (position.y * 50) + "px";
        this.div.style.left = (position.x * 50) + "px";
        this.div.classList.add("bomb");
        gamescreen.appendChild(this.div);
        console.log(map, position);
        map[position.y][position.x].type = "BLOCKED";
    }

    explode(players) {
        this.map[this.position.y][this.position.x].type = "EMPTY";
        this.div.parentElement.removeChild(this.div);

        const radius = 2;

        const minX = this.position.x - radius;
        const minY = this.position.y - radius;
        const maxX = this.position.x + radius;
        const maxY = this.position.y + radius;

        let curX = this.position.x;
        let curY = this.position.y;

        while (curX >= minX) {
            console.log(this.map[curY][curX].div);
            if (this.wallCheck(curX, curY)) break;
            curX--;
        }

        curX = this.position.x;
        curY = this.position.y;
        while (curX <= maxX) {
            console.log(this.map[curY][curX].div);
            if (this.wallCheck(curX, curY)) break;
            curX++;
        }

        curX = this.position.x;
        curY = this.position.y;
        while (curY >= minY) {
            console.log(this.map[curY][curX].div);
            if (this.wallCheck(curX, curY, players)) break;
            curY--;
        }

        curX = this.position.x;
        curY = this.position.y;
        while (curY <= maxY) {
            console.log(this.map[curY][curX].div);
            if (this.wallCheck(curX, curY, players)) break;
            curY++;
        }


    }

    wallCheck(curX, curY, players) {
        if (this.map[curY][curX]) {
            if (this.map[curY][curX].type === "UNBREAKABLE") {
                console.log("blocked", curX, curY);
                return true;
            }
            if (this.map[curY][curX].type === "BREAKABLE") {
                setTileType(this.map, curY, curX, "EMPTY");
                this.map[curY][curX].type = "EMPTY";
                return true;
            }
            if (players) {
                for (let player of players) {
                    if (player.x === curX && player.y === curY) {
                        player.div.parentElement.removeChild(player.div);
                    }
                }
            }
        }
    }
}