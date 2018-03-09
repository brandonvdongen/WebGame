//map data
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
export let spawnpoints = [
    [1, 1],
    [13, 11]
];

//load the map template into the actual data
export function prepare(gamescreen_tiles) {
    return new Promise((resolve, reject) => {
        const map = JSON.parse(JSON.stringify(map_layout));
        if (map && gamescreen_tiles) {
            resolve(map);
        }
        else {
            if (!map) {
                reject(Error("no map loaded"));
            }
            if (!gamescreen_tiles) {
                reject(Error("gamescreen_tiles does not exist"));
            }
        }

    });
}

//get map as array
// export function getMap() {
//     return new Promise(function (resolve, reject) {
//         if (map) {
//             resolve(map);
//         }
//         else {
//             reject(Error("no map loaded"));
//         }
//     });
// }
//
// export function getSpawnPoints() {
//     return new Promise(function (resolve, reject) {
//         if (spawnpoints) {
//             resolve(spawnpoints);
//         }
//         else {
//             reject(Error("no map loaded"));
//         }
//     });
// }

//get tiletype of coordinate in grid
export function getTileType(map, x, y) {
    return new Promise(function (resolve, reject) {
        if (map) {
            console.log(map[x][y]);
            const type = map[x][y].type || map[x][y];
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

export function setTileType(map, x, y, r) {
    const div = map[x][y].div;
    if (r === "EMPTY") div.style.background = "url('assets/svg/Tile_Floor.svg')";
    if (r === "UNBREAKABLE") div.style.background = "url('assets/svg/Wall_Unbreakable.svg')";
    if (r === "BREAKABLE") {
        if (Math.random() > .1) {
            div.style.background = "url('assets/svg/Wall_Breakable.svg')";
        } else {
            map[x][y].type = "EMPTY";
            div.style.background = "url('assets/svg/Tile_Floor.svg')";
        }
    }
}

export function generateMap(map, gamescreen_tiles) {
    return new Promise(function (resolve, reject) {
        if (map) {
            map.forEach((value, x, array) => {
                map[x].forEach((tile, y) => {
                    getTileType(map, x, y).then(r => {
                        const div = document.createElement("div");
                        const tile = {
                            x: x,
                            y: y,
                            div: div,
                            type: r
                        };
                        div.classList.add("tile");
                        div.style.height = "50px";
                        div.style.width = "50px";
                        div.dataset.pos = x + "|" + y;
                        div.dataset.type = r;
                        gamescreen_tiles.appendChild(div);
                        map[x][y] = tile;
                        setTileType(map, x, y, r);
                    });
                });
            });
            console.log(map);
            resolve(map);
        } else {
            reject(Error("no map given"));
        }
    });
}