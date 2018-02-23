//map data
const map_layout = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 2, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 2, 1],
    [1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1],
    [1, 2, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 2, 1],
    [1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1],
    [1, 2, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 2, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];


let map = [];

//load the map template into the actual data
export function prepare() {
    const promise = new Promise((resolve, reject) => {
        map = map_layout;
        if (map) {
            resolve(map);
        }
        else {
            reject(Error("no map loaded"));
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
export function getTileType(x, y) {

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