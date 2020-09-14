const sqlite3 = require("sqlite3");
const path = require("path");
const dbpath = path.resolve(__dirname, "../base-dados/totobola.db");
const Discord = require("discord.js");

module.exports = {
	name : "cleanchampions",

	description : "Limpar jornada do Champions",

	execute(message, args) {

		const messageEmbed = new Discord.MessageEmbed().setTitle("Champions");

		if (["MrRed", "Rouxinol Expansivo"].includes(message.author.username)) {

			if (Object.keys(args).length == 1) {
				
				let db = new sqlite3.Database(dbpath, sqlite3.OPEN_READWRITE);
				
				db.get(`select estado from jornadas where jornada = "champions${args[0]}"`,  (err, estado) => {
					
					if (err) {
						messageEmbed.setColor("#969C9F");
						messageEmbed.addField("Erro", "Erro na conexão da base de dados. Contacte alguém responsável");
						message.channel.send(messageEmbed);
						return;
					}
					
					if ((typeof estado !== "undefined") && (estado.estado === "y")) {
						db.run(`DROP TABLE IF EXISTS champions${args[0]}`);
						db.run(`DROP TABLE IF EXISTS champions${args[0]}_games`);
						db.run("DELETE FROM jornadas where jornada=?", `champions${args[0]}`);

						messageEmbed.setColor("#006798");
						messageEmbed.setDescription("A jornada foi removida com sucesso!");
						message.channel.send(messageEmbed);
					}
					else {
						messageEmbed.setColor("#969C9F");
						messageEmbed.addField("Erro", "Indicar uma jornada ativa!");
						message.channel.send(messageEmbed);
					}
					
					
				});
			}
			else {
				messageEmbed.setColor("#969C9F");
				messageEmbed.addField("Erro", "Indicar uma jornada ativa!");
				message.channel.send(messageEmbed);
			}
		}
		else {
			messageEmbed.setColor("#969C9F");
			messageEmbed.addField("Erro", "Não tens permissão para executar este comando!");
			message.channel.send(messageEmbed);
		}
	}
}
