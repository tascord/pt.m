import Line from "../helpers/Line";
import Priority from "../helpers/Priority";

export default new Line()
    .add('ALM', new Priority().all()) // Alamein
    .add('ASH', new Priority().all()) // Ashburton
    .add('BWD', new Priority().all()) // Burwood
    .add('HWL', new Priority().all()) // Hartwell
    .add('WSN', new Priority().all()) // Willison
    .add('RIV', new Priority().all()) // Riversdale
    .add('CAM', new Priority().all()) // Camberwell
    .add('AUB', new Priority().local('all')) // Auburn
    .add('GFE', new Priority().set('all', 'all', 'none')) // Glenferrie
    .add('HAW', new Priority().local('all')) // Hawthorn
    .add('BLY', new Priority().local('all')) // Burnley
    .add('ERM', new Priority().local('some')) // East Richmond
    .add('RMD', new Priority().all()) // Richmond
    .add('PAR', new Priority().all()) // Parliament
    .add('MCE', new Priority().all()) // Melbourne Central
    .add('FGS', new Priority().all()) // Flagstaff
    .add('SSS', new Priority().all()) // Southern Cross
    .add('FSS', new Priority().all()) // Flinders Street