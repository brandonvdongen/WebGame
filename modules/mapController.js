//map data
let gamescreen;
const map_layout = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 1],
    [1, 0, 1, 2, 1, 2, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 0, 2, 0, 0, 0, 2, 0, 2, 2, 2, 0, 0, 1],
    [1, 2, 1, 2, 1, 0, 1, 2, 1, 0, 1, 0, 1, 2, 1],
    [1, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 2, 2, 1],
    [1, 2, 1, 0, 1, 2, 1, 0, 1, 2, 1, 0, 1, 2, 1],
    [1, 2, 0, 2, 2, 2, 2, 0, 2, 2, 0, 0, 0, 2, 1],
    [1, 2, 1, 2, 1, 2, 1, 0, 1, 2, 1, 0, 1, 2, 1],
    [1, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 1],
    [1, 0, 1, 2, 1, 0, 1, 2, 1, 2, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

//load the map template into the actual data
export function prepare(map) {
    const promise = new Promise((resolve, reject) => {
        map = map_layout;
        gamescreen = document.getElementById("gamescreen");
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
    return promise;
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
    const promise = new Promise(function (resolve, reject) {
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
    return promise;
}

export function drawMap(map, gamescreen) {
    console.log(map);
    map.forEach((value, x, array) => {
        map[x].forEach((tile, y) => {
            getTileType(map, x, y).then(r => {
                console.log(x + ":" + y + " > " + r);
                const div = document.createElement("div");
                div.classList.add("tile");
                div.style.height="50px";
                div.style.width = "50px";
                if(r === "EMPTY")div.style.backgroundColor = "#88A5ED";
                if(r === "UNBREAKABLE")div.style.backgroundColor = "black";
                if(r === "BREAKABLE")div.style.backgroundColor = "gred";
                div.dataset.pos = x+"|"+y;
                div.dataset.type = r;
                gamescreen.appendChild(div);
            });
        });
    })
}