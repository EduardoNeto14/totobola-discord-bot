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
	const args_space = message.content.slice(prefix.length).split(/ +/);
	
	const command = args.shift().toLowerCase();
	const command_space = args_space.shift().toLowerCase();
	
	var args_comb;
	let command_comb = null;
	
	try {	
		args_comb = args_space[0].split(/\n+/);
	}
	catch {}
	
	if (message.isMemberMentioned(client.user)) {
		message.channel.send("Que é que queres, arara burra?");
	}
	else if (command_space === 'tugao') {
		bot.commands.get("tugao").execute(message, args_space);	
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
		bot.commands.get("apostartugao").execute(message, args);	
	}
	else if (command_space === 'starttugao') {
		bot.commands.get("starttugao").execute(message, args_comb);	
	}
	else if (command_space === 'stoptugao') {
		bot.commands.get("stoptugao").execute(message, args_comb);	
	}
	else if (command === 'apostarchampions') {
		bot.commands.get("apostarchampions").execute(message, args);	
	}
	else if (command_space === 'startchampions') {
		bot.commands.get("startchampions").execute(message, args_comb);	
	}
	else if (command_space === 'stopchampions') {
		bot.commands.get("stopchampions").execute(message, args_comb);	
	}
	else if (command === 'apostarbestof') {
		bot.commands.get("apostarbestof").execute(message, args);	
	}
	else if (command_space === 'startbestof') {
		bot.commands.get("startbestof").execute(message, args_comb);	
	}
	else if (command_space === 'stopbestof') {
		bot.commands.get("stopbestof").execute(message, args_comb);	
	}
	else if (command === 'totobola') {
		bot.commands.get("totobola").execute(message, args);	
	}
	else if (command_space === 'cleantugao') {
		bot.commands.get("cleantugao").execute(message, args_space);	
	}
	else if (command_space === 'cleanchampions') {
		bot.commands.get("cleanchampions").execute(message, args_space);	
	}
	else if (command_space === 'cleanbestof') {
		bot.commands.get("cleanbestof").execute(message, args_space);	
	}
	else if (command === 'registar') {
		bot.commands.get("registar").execute(message, args);	
	}
	else if (command === 'updatetugao') {
		bot.commands.get("updatetugao").execute(message, args);	
	}
	else if (command === 'updatechampions') {
		bot.commands.get("updatechampions").execute(message, args);	
	}
	else if (command === 'updatebestof') {
		bot.commands.get("updatebestof").execute(message, args);	
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
	else {
		const messageEmbed = new Discord.MessageEmbed().setTitle("Comando");
		messageEmbed.setColor("");
		messageEmbed.setDescription("Nao conheço esse comando, **sua arara burra**!\nConsulta os comandos em **!comandos**!");
		message.channel.send(messageEmbed);
	}
});

bot.login("NzQwOTQwNjk1ODc0ODMwMzc3.XywUyw.DNicv1AbRIERmsgyM0d1-ivLeIY")
