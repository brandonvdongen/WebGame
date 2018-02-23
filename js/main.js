import * as mapController from '../modules/mapController.js';

mapController.prepare();
console.log(mapController.getMap());
console.log(mapController.getTileType(1,1));