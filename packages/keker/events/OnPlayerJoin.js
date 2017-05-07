var Logs = require('../modules/logs');
var DB = require('../modules/db');

module.exports =
{
	"playerJoin" : player =>
	{
        player.admin = 0;
        console.log ( player );
        Logs.Insert("Player " + player.name + " (" + player.ip + ") connected on server");
        player.dimension = 999;
		player.outputChatBox("Welcome on the server, <b style='color: red'>" + player.name + "</b>.");
        DB.Handle.query("SELECT null FROM server_players WHERE Name = ?", player.name, function(e, result) {
            if ( result.length ) {
                player.outputChatBox("Please login with command <b>/login [Password]</b>");
            } else player.outputChatBox("Please register with command <b>/register [Password]</b>");
            
        });
	}
}