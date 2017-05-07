var Logs = require('../modules/logs');
var DB = require('../modules/db');

module.exports =
{
	"playerDeath" : (player, killer, reason) =>
	{
        if(player != killer && typeof killer !== 'undefined') {
            player.outputChatBox("<span style='color:#333'>You've been killed by " + killer.name + "</span>");
            
            player.spawn(new mp.Vector3(-425.517, 1123.620, 325.8544));
        }
        else if(player == killer) {
            player.outputChatBox("<span style='color:#333'>You've commited suicide.");
            
            player.spawn(new mp.Vector3(-425.517, 1123.620, 325.8544));
        }
	}
}