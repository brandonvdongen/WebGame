let x = 13;
let y = 15;

let map = [];

let xt = x;
while(xt--){
    map[xt] = [];
    let yt=y;
    while(yt--){
        if(xt===0 || xt===x-1 || yt === 0 || yt === y-1){
            map[xt][yt] = 1;
        }else{
            map[xt][yt] = 0;
        }

        console.log(yt);
    }
}

console.log(JSON.stringify(map));