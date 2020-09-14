const sqlite3 = require("sqlite3");
const path = require('path');
const dbpath = path.resolve(__dirname, "../base-dados/totobola.db");
const Discord = require("discord.js");
let sql = "SELECT * from bestof ORDER BY totalBestOf DESC;"

module.exports = {

	name: "bestof",
	
	description: "Apresenta a tabela atual referente ao Best Of das Ligas",
	
	execute(message, args) {
		
		const messageEmbed = new Discord.MessageEmbed().setTitle("Tabela Best Of");
		let db = new sqlite3.Database(dbpath, sqlite3.OPEN_READONLY, (err) => {
			
			if (err) {
				messageEmbed.setColor("#969C9F");
				messageEmbed.addField("Erro", "Erro na conexão da base de dados. Contacte alguém responsável");
				message.channel.send(messageEmbed);
				return;
			}
			
			if (Object.keys(args).length === 0) {
				
				db.all(sql, [], (err, rows) => {
					if (err) {
						messageEmbed.setColor("#969C9F");
						messageEmbed.addField("Erro", "Erro na conexão da base de dados. Contacte alguém responsável");
						message.channel.send(messageEmbed);
						return;
					}
					
					messageEmbed.setColor("#a62019");
					for (const [index, row] of rows.entries()) {
						result = `Pontos: **${row.totalBestOf}** --- Apostadas: **${row.jornadas}**`;
						if (row.jornadas !== 0)	result += `--- Média: **${row.totalBestOf/row.jornadas}**`;
						messageEmbed.addField(`**(${index + 1}º)	${row.jogador}**`, result); 
					}
					message.channel.send(messageEmbed);

				});
			}
			else {
				let sql = "select * from (select * from bestof order by totalBestOf desc) where jogador = ?";
				
				if (typeof message.mentions.users.first() !== "undefined") {
					db.get(sql, [`${message.mentions.users.first().username}`], (err, row) => {
						
						if (err) {
							messageEmbed.setColor("#969C9F");
							messageEmbed.addField("Erro", "Erro na conexão da base de dados. Contacte alguém responsável");
							message.channel.send(messageEmbed);
							return;
						}
						
						if (row != null) {
							messageEmbed.setColor('#a62019');
							messageEmbed.setAuthor(message.mentions.users.first().username, message.mentions.users.first().displayAvatarURL());
							messageEmbed.addFields(
								{name : "Jornadas Apostadas: ", value : `**${row.jornadas}**`, inline : false},
								{name : "Total Best Of: ", value : `**${row.totalBestOf}**`, inline : false},
							);
							message.channel.send(messageEmbed);
						}
						else {
							messageEmbed.setColor("#969C9F");
							messageEmbed.addField("Erro", "Utilizador não se encontra registado!");
							message.channel.send(messageEmbed);
						}
					});
				}
				else {
					messageEmbed.setColor("#969C9F");
					messageEmbed.addField("Erro", "Precisas de mencionar alguém");
					message.channel.send(messageEmbed);
				}
			}
		});
	}
}
