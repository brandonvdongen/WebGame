//map data
let gamescreen;
const map_layout = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 1],
    [1, 0, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 0, 1],
    [1, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 1],
    [1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1],
    [1, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 1],
    [1, 0, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 0, 1],
    [1, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

//load the map template into the actual data
export function prepare(gamescreen) {
    return new Promise((resolve, reject) => {
        const map = map_layout;
        if (map && gamescreen) {
            resolve(map);
        }
        else {
            if (!map) {
                reject(Error("no map loaded"));
            }
            if (!gamescreen) {
                reject(Error("gamescreen does not exist"));
            }
        }

    });
}

//get map as array
export function getMap() {
    const promise = new Promise(function (resolve, reject) {
        if (map) {
            resolve(map);
        }
        else {
            reject(Error("no map loaded"));
        }
    });
    return promise;
}

//get tiletype of coordinate in grid
export function getTileType(map, x, y) {
    return new Promise(function (resolve, reject) {
        if (map) {
            const type = map[x][y];
            if (type === 0) resolve("EMPTY");
            if (type === 1) resolve("UNBREAKABLE");
            if (type === 2) resolve("BREAKABLE");
            if (type === 3) resolve("PICKUP");
            if (type === 4) resolve("PLAYER");
            if (type === 5) resolve("EXPLOSION");
        }
        else {
            reject(Error("no map loaded"));
        }
    });
}

export function setTileType(map, div, x, y, r) {
    if (r === "EMPTY") div.style.background = "url('assets/svg/Tile_Floor.svg')";
    if (r === "UNBREAKABLE") div.style.background = "url('assets/svg/Wall_Unbreakable.svg')";
    if (r === "BREAKABLE") {
        if (Math.random() > .1) {
            div.style.background = "url('assets/svg/Wall_Breakable.svg')";
        } else {
            map[x][y] = 0;
            div.style.background = "url('assets/svg/Tile_Floor.svg')";
        }
    }
}

export function generateMap(map, gamescreen) {
    console.log(map);
    let count = 0;
    map.forEach((value, x, array) => {
        map[x].forEach((tile, y) => {
            getTileType(map, x, y).then(r => {
                console.log(x + ":" + y + " > " + r);
                const div = document.createElement("div");
                div.classList.add("tile");
                div.style.height = "50px";
                div.style.width = "50px";
                div.dataset.pos = x + "|" + y;
                div.dataset.type = r;
                gamescreen.appendChild(div);
            });
        });
    })
}