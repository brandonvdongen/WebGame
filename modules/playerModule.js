const players = {};

export function preparePlayer(map) {
    return new Promise((resolve, reject) => {
        map = map_layout;
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
export function takeControl(){

}