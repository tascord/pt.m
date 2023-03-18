import Line from "../helpers/Line";
import Priority from "../helpers/Priority";

export default new Line()
    
    .add('GWY', new Priority().all()) // Glen Waverley
    .add('SYN', new Priority().all()) // Syndal
    .add('MWY', new Priority().all()) // Mount Waverley
    .add('JOR', new Priority().all()) // Jordanville
    .add('HOL', new Priority().all()) // Holmesglen
    .add('EMV', new Priority().all()) // East Malvern
    .add('DLG', new Priority().all()) // Darling

    .unsure()
    .add('GIR', new Priority().local('all')) // Glen Iris
    .add('GAR', new Priority().local('all')) // Gardiner
    .add('TGA', new Priority().local('all')) // Tooronga
    .add('KYG', new Priority().local('all')) // Kooyong
    .add('HEY', new Priority().local('all')) // Heyington

    .add('BLY', new Priority().local('all')) // Burnley
    .add('ERM', new Priority().local('some')) // East Richmond
    .add('RMD', new Priority().all()) // Richmond
    .add('PAR', new Priority().all()) // Parliament
    .add('MCE', new Priority().all()) // Melbourne Central
    .add('FGS', new Priority().all()) // Flagstaff
    .add('SSS', new Priority().all()) // Southern Cross
    .add('FSS', new Priority().all()) // Flinders Street