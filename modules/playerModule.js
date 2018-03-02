const players = {};

export function preparePlayer(map) {
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
export function takeControl(){

}