const sqlite3 = require("sqlite3");
const path = require('path');
const dbpath = path.resolve(__dirname, "../base-dados/totobola.db");
const Discord = require("discord.js");

module.exports = {

	name: "registar",
	
	description: "Regista jogador no tobola",
	
	execute(message, args) {

		const messageEmbed = new Discord.MessageEmbed().setTitle("Registo Totobola");
		if (Object.keys(args).length === 0) {
			
			let db = new sqlite3.Database(dbpath, sqlite3.OPEN_READWRITE, (err) => {
				
				if (err) {
					messageEmbed.setColor("#969C9F");
					messageEmbed.addField("Erro", "Erro na conexão da base de dados. Contacte alguém responsável");
					message.channel.send(messageEmbed);
					return;
				}

				db.get("SELECT * from participantes where jogador = ? ", [message.author.username], (err, row) => {
					if (err) {
						messageEmbed.setColor("#969C9F");
						messageEmbed.addField("Erro", "Erro na conexão da base de dados. Contacte alguém responsável");
						message.channel.send(messageEmbed);
						return;
					}

					if (row != null) {
						console.log(row);
						messageEmbed.setColor("#F8C300");
						messageEmbed.setDescription("Já estás registado no Totobola.\n\n**Boa sorte!**");
						message.channel.send(messageEmbed);
					}

					else {
						db.run("INSERT INTO participantes(jogador) values (?)", [`${message.author.username}`], (err) => {
							if (err) {
								messageEmbed.setColor("#969C9F");
								messageEmbed.addField("Erro", "Erro na conexão da base de dados. Contacte alguém responsável");
								message.channel.send(messageEmbed);
								return;
							}

							db.run(`INSERT INTO tugao(jogador, jornadas, totalTugao) values ("${message.author.username}", 0, 0)`);
							db.run(`INSERT INTO champions(jogador, jornadas, totalChampions) values ("${message.author.username}", 0, 0)`);
							db.run(`INSERT INTO bestof(jogador, jornadas, totalBestOf) values ("${message.author.username}", 0, 0)`);
							db.run(`INSERT INTO total(jogador, totalTugao, totalChampions, totalBestOf, totalDiscordiano) values ("${message.author.username}", 0, 0, 0, 0)`);
						});
					
						messageEmbed.setColor("#CC7900");
						messageEmbed.setAuthor(message.author.username, message.author.displayAvatarURL());
						messageEmbed.addField("Sucesso", "Resgistado com sucesso!\n\n**Boa sorte, sua arara burra!**");
						message.channel.send(messageEmbed);
					}
				});

				db.close();
			
			});
		}
		else {
			messageEmbed.setColor("#969C9F");
			messageEmbed.setDescription("Este comando não recebe argumentos.\n\n Usa apenas **!registar**.\n")
			messageEmbed.addField("Erro", "Argumentos a mais...");
			message.channel.send(messageEmbed);
		}
		
	}
}

