var DB = require('./db');

var PlayersOnline = [];

var Faction = function(sqlID, name) {
    this.sqlID = sqlID;
    this.name = name;
    this.ID = FindEmptySlot();
}

function FindEmptySlot () {
    for ( var i = 0; i < global.MAX_PLAYERS; i++ ) {
        if ( !IsPlayerLogged(i) ) return i;   
    }
}

module.exports.CreatePlayerClass = function(sqlid, name) {
    var playa = new Player(sqlid, name);
    PlayersOnline [ playa.ID ] = playa;
    
    return playa.ID;
}

module.exports.DeletePlayerClass = function(id) {
    delete PlayersOnline[id];
}

module.exports.GetPlayerIDBySQLID = function(sqlid) {
    for ( var i = 0; i < global.MAX_PLAYERS; i++ ) {
        if (  IsPlayerLogged(i) ) {
            if ( PlayersOnline [ i ].sqlID == sqlid ) return i;
        }
    }    
}

function IsPlayerLogged(id) {
    return ( typeof PlayersOnline[id] !== 'undefined' );
}
        
module.exports.IsPlayerLogged = IsPlayerLogged;

module.exports.Init = function() {
    DB.Handle.query("CREATE TABLE IF NOT EXISTS `server_players` (`ID` int(11) NOT NULL AUTO_INCREMENT, `Name` varchar(24) NOT NULL, `Password` varchar(128) NOT NULL, `Admin` tinyint(1) unsigned zerofill NOT NULL, PRIMARY KEY (`ID`)) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;", function() { } );
    DB.Handle.query("ALTER TABLE `server_players` ADD PRIMARY KEY (`ID`);", function() { } );
    DB.Handle.query("ALTER TABLE `server_players` MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;", function() { } );
}
