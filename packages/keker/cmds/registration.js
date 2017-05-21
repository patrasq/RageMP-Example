var DB = require('../modules/db');
var Players = require('../modules/players');

module.exports =
{
	"login": (player, args) =>
	{
        if ( typeof player.ID === 'undefined' || Players.IsPlayerLogged ( player.ID ) ) {
            DB.Handle.query("SELECT ID, Admin FROM server_players WHERE Name = ? AND Password = ? LIMIT 1", [player.name, args[0]], function(e, result) {
                if ( result.length ) {
                    player.outputChatBox("<b style='color:##999;'>(SERVER):</b> Welcome, " + player.name); 

                    player.ID = Players.CreatePlayerClass(result[0]["id"], player.name);

                    player.admin = result[0]["Admin"];
                    player.sqlID = result[0]["ID"];

                    player.dimension = 0;
                    player.model = mp.joaat("mp_m_forgery_01");
                    player.spawn(new mp.Vector3(-599.067, -599.816, 34.675));

                } else player.outputChatBox("<b style='color: red'>Wrong password, try again!</b>");        
            });
        }
    },
    "register": (player, args) =>
    {
        if ( typeof player.ID === 'undefined' || Players.IsPlayerLogged ( player.ID ) ) {
            DB.Handle.query("SELECT null FROM server_players WHERE Name = ?", player.name, function(e, result) {
                if (!e) {
                    if ( !result.length ) {
                        if ( args[0].length >= 6 ) {
                            DB.Handle.query("INSERT INTO server_players (Name, Password, Admin) VALUES (?,?,0)", [player.name, args[0]], function(e) {
                                if ( e ) console.log ( e );   
                                player.outputChatBox("Now use /login [Password]"); 
                            });
                        } else player.outputChatBox("The password length need to be minimum 6."); 
                    } else player.outputChatBox("This account already exist!"); 
                } else console.log (e);
            });
        } else player.outputChatBox("[DEBUG:] ERROR!")
    }
}
