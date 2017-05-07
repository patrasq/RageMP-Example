var Players = require('../modules/players');
var Logs = require('../modules/logs');

module.exports.ServerInit = function() {
    Players.Init();
    Logs.Init();
}