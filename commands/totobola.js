const sqlite3 = require("sqlite3");
const path = require("path");
const progpath = path.resolve(__dirname, "../base-dados/totobola.db");
const Discord = require("discord.js");

module.exports = {
	name : "totobola",
	description : "Iniciar época do Totobola",
	execute(message, args) {
		const messageEmbed = new Discord.MessageEmbed();
		if (["MrRed", "Rouxinol Expansivo"].includes(message.author.username)) {
			if (Object.keys(args).length != 0) {                                                                   
				messageEmbed.setTitle("Totobola");                                                 
				messageEmbed.setColor("#969C9F");                                                              
				messageEmbed.addField("Erro", "Demasiados argumentos");                                        
						
				message.channel.send(messageEmbed);                                                            
			}
			else {
				let db = new sqlite3.Database(progpath, sqlite3.OPEN_READWRITE);
				db.run("CREATE TABLE IF NOT EXISTS participantes(jogador text)");
				db.run("CREATE TABLE IF NOT EXISTS jornadas(jornada text, jogos int, estado text)");
				db.run("CREATE TABLE IF NOT EXISTS tugao(jogador text, jornadas int, totalTugao int)");
				db.run("CREATE TABLE IF NOT EXISTS champions(jogador text, jornadas int, totalChampions int)");
				db.run("CREATE TABLE IF NOT EXISTS bestof (jogador text, jornadas int, totalBestOf int)")
				db.run("CREATE TABLE IF NOT EXISTS total(jogador text, totalTugao int, totalChampions int, totalBestOf int, totalDiscordiano int)");
				db.run("CREATE TABLE IF NOT EXISTS vencedoresTugao (jogador text, pontuacao int, jornada text)");
				db.run("CREATE TABLE IF NOT EXISTS vencedoresChampions (jogador text, pontuacao int, jornada text)");
				db.run("CREATE TABLE IF NOT EXISTS vencedoresBestOf (jogador text, pontuacao int, jornada text)");
				db.close()

				messageEmbed.setTitle("Totobola Discordiano");
				messageEmbed.setDescription("Bem-vindos a uma nova época do Totobola Discordiano.\n\nA partir deste momento podem-se registar utilizando o comando **!registar**.\n\n**Obrigado a todos e boa sorte!**")                                                 
				messageEmbed.setColor("#F93A2F");                                                              
									
				message.channel.send(messageEmbed);                                                            
			}
		}
		else {
			messageEmbed.setTitle("Totobola");
			messageEmbed.setColor("");
			messageEmbed.addField("Erro", "Não tens permissão para executar este comando");

			message.channel.send(messageEmbed);
		}
	}
}