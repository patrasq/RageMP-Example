var DB = require('../modules/db');
var Players = require('../modules/players');

function findPlayerByIdOrNickname(playerName) {
    if (playerName == parseInt(playerName))  {
        return mp.players.at(playerName);
    }
    else {
        let foundPlayer = null;

        mp.players.forEach((_player) => {
          if (_player.name === playerName) {
            foundPlayer = _player;
          }
        });

        return foundPlayer;
    }
}


module.exports =
{
	"a": (player, args) =>
	{
        if (typeof args[0] === 'undefined') return player.outputChatBox("<b style='color:#999'>(Syntax)</b> /a [text]");
        if(!args[0].length) return player.outputChatBox("<b style='color:#999'>(Syntax)</b> /a [text]");
        if(!player.admin) return player.outputChatBox("<span style='color:#ff2d00'>(!) Nu esti administrator!");
        mp.players.forEach(_player => {
            if(_player.admin)
                _player.outputChatBox("<span style='color:#f3cb8f'>Admin "  + player.name + ": " + args.join(' '))
        });
	},
    
    "goto" : (player, args) => {
        if (typeof args[0] === 'undefined') return player.outputChatBox("<b style='color:#999'>(Syntax)</b> /goto [id]");
        if(!args[0].length) return player.outputChatBox("<b style='color:#999'>(Syntax)</b> /goto [id]");
        if(!player.admin) return player.outputChatBox("<span style='color:#ff2d00'>(!) Nu esti administrator!");
        var id = findPlayerByIdOrNickname(args[0]);
        player.position = id.position;
        player.ouputChatBox("<span style = 'color: grey'>Ai fost teleportat!</span>");
    },
    
    "kick": (player, args) =>
	{
        if (typeof args[0] === 'undefined' || typeof args[1] === 'undefined') return player.outputChatBox("<b style='color:#999'>(Syntax)</b> /kick [id] [reason]");
        if(!args[0].length || !args[1].length) return player.outputChatBox("<b style='color:#999'>(Syntax)</b> /kick [id] [reason]");
        if(!player.admin) return player.outputChatBox("<span style='color:#ff2d00'>(!) Nu esti administrator!");
        const recipient = findPlayerByIdOrNickname(args[0]);

        if (!recipient) {
          player.outputChatBox("<b>User not found</b>");
          return false;
        }
        
        mp.players.forEach(_player => { 
            _player.outputChatBox("<span style='color:#ff2d00'>" + recipient.name + " has been kicked by " + player.name + ", reason: " + args[1]);
        });
        
        recipient.kick(args[1]);
	},
    
    "spawn": (player, args) =>
	{
            if(!player.admin) return player.outputChatBox("<span style='color:#ff2d00'>(!) Nu esti administrator!");
        if (typeof args[0] == 'undefined') return player.outputChatBox("<b style='color:#999'>(Syntax)</b> /spawn [id]");
        if(!args[0].length) return player.outputChatBox("<b style='color:#999'>(Syntax)</b> /spawn [id]");
        
        const recipient = findPlayerByIdOrNickname(args[0]);

        if (!recipient) {
          player.outputChatBox("<b>User not found</b>");
          return false;
        }
        
        recipient.outputChatBox("You have been respawned.");
        player.outputChatBox("You've respawned " + recipient.name);

        recipient.spawn(new mp.Vector3(-425.517, 1123.620, 325.8544));
	},
    
    "veh": (player, args) =>
	{
        if(player.admin < 6) return player.outputChatBox("<span style='color:#ff2d00'>(!) Nu esti administrator!");
        if (typeof args[0] == 'undefined') return player.outputChatBox("<b style='color:#999'>(Syntax)</b> /veh [name]");
        if(!args[0].length) return player.outputChatBox("<b style='color:#999'>(Syntax)</b> /veh [name]");
        
		var pos = player.position;
		pos.x += 2.0;
			
		if(player.veh)
			player.veh.destroy();
		
		player.veh = mp.vehicles.new(mp.joaat(args[0]), pos);
		player.veh.dimension = player.dimension;
        
        player.outputChatBox("You've spawn a " + args[0]);
	},
    
    "dive": (player, args) =>
	{
        
        if(!player.admin) return player.outputChatBox("<span style='color:#ff2d00'>(!) Nu esti administrator!");
        
		var pos = player.position;
		pos.z += 100.0;
		
		player.position = new mp.Vector3(pos.x, pos.y, pos.z);
	},
    
    "mypos": (player, args) =>
    {
        if(!player.admin) return player.outputChatBox("<span style='color:#ff2d00'>(!) Nu esti administrator!");
        player.outputChatBox(player.position.x + " " + player.position.y + " " + player.position.z);
    },
    
    "makeadmin": (player, args) =>
    {
        if(player.admin < 6) return player.outputChatBox("<span style='color:#ff2d00'>(!) Nu esti administrator!");
        if (typeof args[0] == 'undefined' || typeof args[1] == 'undefined') return player.outputChatBox("<b style='color:#999'>(Syntax)</b> /makeadmin [id] [admin level]");
        if(!args[0].length || !args[1].length) return player.outputChatBox("<b style='color:#999'>(Syntax)</b> /makeadmin [id] [admin level]");
        
        const recipient = findPlayerByIdOrNickname(args[0]);

        if (!recipient) {
          player.outputChatBox("<b>User not found</b>");
          return false;
        }
        
        DB.Handle.query("UPDATE `server_players` SET `Admin` = ? WHERE `ID` = ?", [args[1], recipient.sqlID]);
        
        mp.players.forEach(_player => {
            if(_player.admin) {
                _player.outputChatBox("<marquee style='color:red;font-size:20px;'>SERVER NEWS</marquee>");
                _player.outputChatBox("<span style='color:#128ee9'> " + player.name + " promoted " + recipient.name + " to admin level " + args[1] + "</span>");
                _player.outputChatBox("<marquee style='color:red;font-size:20px;'>SERVER NEWS</marquee>");
            }
        });
        
        if(recipient != player) {
            recipient.outputChatBox("<span style='color:#128ee9'>" + player.name + " promoted you to admin level " + args[1] + "</span>");
        }
        player.outputChatBox('<img src="https://rage.mp/uploads/set_resources_7/84c1e40ea0e759e3f1505eb1788ddf3c_woman_01.png" id="woman">');
        recipient.admin = args[1];
    }
}
