import Line from "../helpers/Line";
import Priority from "../helpers/Priority";

export default new Line()
    .add('LIL', new Priority().all()) // Lilydale
    .add('MLK', new Priority().all()) // Mooroolbark
    .add('CDN', new Priority().all()) // Croydon
    .add('RWE', new Priority().all()) // Ringwood East
    .add('RWD', new Priority().all()) // Ringwood
    .add('HTD', new Priority().all()) // Heatherdale
    .add('MCH', new Priority().all()) // Mitcham
    .add('NWG', new Priority().all()) // Nunawading
    .add('BBN', new Priority().all()) // Blackburn
    .add('LAB', new Priority().set('all', 'all', 'some')) // Laburnum
    .add('BOX', new Priority().all()) // Box Hill
    .add('MAB', new Priority().set('all', 'all', 'none')) // Mont Albert
    .add('SHL', new Priority().set('all', 'all', 'none')) // Surrey Hills
    .add('CHM', new Priority().set('all', 'all', 'none')) // Chatham
    .add('CBY', new Priority().set('all', 'all', 'none')) // Canterbury
    .add('ECM', new Priority().set('all', 'all', 'none')) // East Camberwell
    .add('CAM', new Priority().all()) // Camberwell
    .add('AUB', new Priority().local('all')) // Auburn
    .add('GFE', new Priority().set('all', 'some', 'some')) // Glenferrie
    .add('HAW', new Priority().local('all')) // Hawthorn
    .add('BLY', new Priority().local('all')) // Burnley
    .add('ERM', new Priority().local('some')) // East Richmond
    .add('RMD', new Priority().all()) // Richmond
    .add('PAR', new Priority().all()) // Parliament
    .add('MCE', new Priority().all()) // Melbourne Central
    .add('FGS', new Priority().all()) // Flagstaff
    .add('SSS', new Priority().all()) // Southern Cross
    .add('FSS', new Priority().all()) // Flinders Street