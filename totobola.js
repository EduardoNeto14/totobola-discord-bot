const Discord = require("discord.js");

const bot = new Discord.Client();

const prefix = "!";

const fs = require("fs");

bot.commands = new Discord.Collection();

const commandFiles = fs.readdirSync("./commands/").filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	bot.commands.set(command.name, command);
}

bot.once("ready", () => {
	console.log("TOTOBOLA is ON!");
});

bot.on("message", message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/\n+/);
	
	let j = args[0];

	const args_space = message.content.slice(prefix.length).split(/ +/);
	
	console.log("ARGS -> ", args);
	console.log("ARGS SPACE-> ", args_space);

	const command = args.shift().toLowerCase().trim();

	const command_space = args_space.shift().toLowerCase();
	
	console.log("ARGS (AFTER)-> ", args);
	console.log("ARGS SPACE (AFTER)-> ", args_space);

	var args_comb;

	try {
		args_comb = Object.assign({}, args);
		args_comb = Object.values(args_comb);
		args_comb.unshift(j.split(/ +/)[1]);
		console.log(`ARGS_COMB: ${args_comb}\n`)
	}
	catch {}
	
	/*console.log("MESSAGE: ", message);
	console.log("ARGS: ", args);*/
	
	var args_stop = Object.assign({}, args);
	args_stop = Object.values(args_stop);

	if (args[0] != undefined) {args[0] = undefined};

	if (command_space === 'tugao') {
		bot.commands.get("tugao").execute(message, args_space);	
	}
	else if (command_space === 'jornada') {
		bot.commands.get("jornada").execute(message, args_space);	
	}
	else if (command_space === 'champions') {
		bot.commands.get("champions").execute(message, args_space);	
	}
	else if (command_space === 'bestof') {
		bot.commands.get("bestof").execute(message, args_space);	
	}
	else if (command_space === 'total') {
		bot.commands.get("total").execute(message, args_space);	
	}
	else if (command_space === 'player') {
		bot.commands.get("player").execute(message, args_space);	
	}
	else if (command === 'apostartugao') {
		aposta = args_comb.filter( item => item );
		//console.log("ARGS_COMB: ", args_comb);
		//var aposta = args_comb.filter( function(und) {
		//	return und != undefined;
		//});

		console.log(`Aposta: ${aposta}\n`);
		bot.commands.get("apostartugao").execute(message, aposta);	
	}
	else if (command_space === 'starttugao') {
		
		bot.commands.get("starttugao").execute(message, args_comb);	
	}
	else if (command_space === 'stoptugao') {
		console.log("########STOP TUGÂO########\n", args_comb);
		bot.commands.get("stoptugao").execute(message, args_comb);	
	}
	else if (command === 'apostarchampions') {
		aposta = args_comb.filter( item => item );
		//var aposta = args_comb.filter( function(und) {
		//	return und != undefined;
		//});
		bot.commands.get("apostarchampions").execute(message, aposta);	
	}
	else if (command_space === 'startchampions') {
		bot.commands.get("startchampions").execute(message, args_comb);	
	}
	else if (command_space === 'stopchampions') {
		console.log(args_comb);
		bot.commands.get("stopchampions").execute(message, args_comb);	
	}
	else if (command === 'apostarbestof') {
		aposta = args_comb.filter( item => item );
		//var aposta = args_comb.filter( function(und) {
		//	return und != undefined;
		//});
		bot.commands.get("apostarbestof").execute(message, aposta);	
	}
	else if (command_space === 'startbestof') {
		bot.commands.get("startbestof").execute(message, args_comb);	
	}
	else if (command_space === 'stopbestof') {
		console.log(args_comb);
		bot.commands.get("stopbestof").execute(message, args_comb);	
	}
	else if (command === 'totobola') {
		var aposta = args.filter( function(und) {
			return und != undefined;
		});
		bot.commands.get("totobola").execute(message, aposta);	
	}
	else if (command_space === 'cleantugao') {
		bot.commands.get("cleantugao").execute(message, args_space);	
	}
	else if (command_space === 'resultados') {
		console.log("RESULTADOS: ", args_space);
		bot.commands.get("resultados").execute(message, args_space);	
	}
	else if (command_space === 'cleanchampions') {
		bot.commands.get("cleanchampions").execute(message, args_space);	
	}
	else if (command_space === 'cleanbestof') {
		bot.commands.get("cleanbestof").execute(message, args_space);	
	}
	else if (command === 'registar') {
		var aposta = args.filter( function(und) {
			return und != undefined;
		});
		bot.commands.get("registar").execute(message, aposta);	
	}
	else if (command === 'updatetugao') {
		aposta = args_comb.filter( item => item );
		//var aposta = args_comb.filter( function(und) {
		//	return und != null;
		//});
		console.log(`Update Tugão: ${aposta}`);
		bot.commands.get("updatetugao").execute(message, aposta);	
	}
	else if (command === 'updatechampions') {
		
		aposta = args_comb.filter( item => item );
		//var aposta = args_comb.filter( function(und) {
		//	return und != null;
		//});
		console.log(`Update Champions: ${aposta}`);
		bot.commands.get("updatechampions").execute(message, aposta);	
	}
	else if (command === 'updatebestof') {
		
		aposta = args_comb.filter( item => item );
		//var aposta = args_comb.filter( function(und) {
		//	return und != null;    //dantes undefined
		//});
		console.log(`Update Best Of: ${aposta}`);
		bot.commands.get("updatebestof").execute(message, aposta);	
	}
	else if (command_space === 'comandos') {
		bot.commands.get("comandos").execute(message, args_space);	
	}
	else if (command_space === 'vencedorestugao') {
		bot.commands.get("vencedorestugao").execute(message, args_space);	
	}
	else if (command_space === 'vencedoreschampions') {
		bot.commands.get("vencedoreschampions").execute(message, args_space);	
	}
	else if (command_space === 'vencedoresbestof') {
		bot.commands.get("vencedoresbestof").execute(message, args_space);	
	}
	else if (command_space === 'minhaaposta') {
		bot.commands.get("minhaaposta").execute(message, args_space);	
	}
	else if (command_space === 'alterartugao') {
		console.log(args_comb);
		bot.commands.get("alterartugao").execute(message, args_comb);	
	}
	else if (command_space === 'alterarchampions') {
		console.log(args_comb);
		bot.commands.get("alterarchampions").execute(message, args_comb);	
	}
	else if (command_space === 'alterarbestof') {
		console.log(args_comb);
		bot.commands.get("alterarbestof").execute(message, args_comb);	
	}
	else if (command_space === 'stats') {
		bot.commands.get("stats").execute(message, args);	
	}
	else if (command_space === 'retirar') {
		if (["MeRed", "Rouxinol Expansivo"].includes(message.author.username)) {
			const messageEmbed = new Discord.MessageEmbed().setTitle("Pontuação");
			messageEmbed.setColor("");
			messageEmbed.setDescription(`1 ponto retirado ao garotão ${message.mentions.users.first()}`);
			message.channel.send(messageEmbed);
		}
	}
	else if (command_space === 'devolver') {
		if (["MeRed", "Rouxinol Expansivo"].includes(message.author.username)) {
			message.channel.send({
				files : [{
						attachment : "/home/eduardo/bot-totobola/afinal.gif",
						name : "afinal.gif"
					}]
			});
		}
	}
	else {
		const messageEmbed = new Discord.MessageEmbed().setTitle("Comando");
		messageEmbed.setColor("");
		messageEmbed.setDescription("Nao conheço esse comando, **sua arara burra**!\nConsulta os comandos em **!comandos**!");
		message.channel.send(messageEmbed);
	}
});

bot.login("NzQwOTQwNjk1ODc0ODMwMzc3.XywUyw.Cc-ZrtdqnLXrgv9jYk5Zmfe0o3I")
