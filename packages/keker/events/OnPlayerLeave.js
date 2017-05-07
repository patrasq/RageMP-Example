var Players = require('../modules/players');

module.exports =
{
	"playerQuit" : (player, exitType, reason) =>
	{
        Players.DeletePlayerClass ( player.ID ); 
	}
}