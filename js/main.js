import * as mapController from '../modules/mapController.js';

mapController.prepare()
    .then(() => {
        mapController.getMap()
            .then(map => {
                //log map data
            console.log(map);
        });
    });