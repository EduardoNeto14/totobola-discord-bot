const sqlite3 = require("sqlite3");
const path = require('path');
const dbpath = path.resolve(__dirname, "../base-dados/totobola.db");
const Discord = require("discord.js");

module.exports = {

	name: "player",
	
	description: "Informações acerca do jogador",
	
	execute(message, args) {
		const messageEmbed = new Discord.MessageEmbed().setTitle("Informação do Jogador");
		let sql = "select * from (select * from total order by totalDiscordiano desc) where jogador = ?;"
		
		let db = new sqlite3.Database(dbpath, sqlite3.OPEN_READONLY, (err) => {
			if (err) {
				messageEmbed.setColor("#969C9F");
				messageEmbed.addField("Erro", "Erro na conexão da base de dados. Contacte alguém responsável");
				message.channel.send(messageEmbed);
				return;
			}

			if (Object.keys(args).length === 0 || Object.keys(args).length > 1) {
				messageEmbed.setColor("#969C9F");
				messageEmbed.addField("Erro", "Nº de argumentos inválido");
				message.channel.send(messageEmbed);
				return;
			}
			
			if (typeof message.mentions.users.first() !== "undefined") {

				db.get(sql, [`${message.mentions.users.first().username}`], (err, row) => {
					
					if (err) {
						messageEmbed.setColor("#969C9F");
						messageEmbed.addField("Erro", "Erro na conexão da base de dados. Contacte alguém responsável");
						message.channel.send(messageEmbed);
						return;
					}

					if (row != null) { 
						messageEmbed.setColor('#e56b00')
						messageEmbed.setAuthor(message.mentions.users.first().username, message.mentions.users.first().displayAvatarURL());
						messageEmbed.addFields(
							{name : "Tugão: ", value : `**${row.totalTugao}**`, inline : true}
						);
						
						db.get(`select count(*) + 1 from tugao where totalTugao > (select totalTugao from tugao where jogador = "{message.mentions.users.first().username}")`, (err, position) => {
							
							
							if (err) {
								messageEmbed.setColor("#969C9F");
								messageEmbed.addField("Erro", "Erro na conexão da base de dados. Contacte alguém responsável");
								message.channel.send(messageEmbed);
								return;
							}
							
							messageEmbed.addField("Posição:", `${Object.values(position)[0]}º`);

							db.get(`select count(*) from vencedoresTugao where jogador = "${message.mentions.users.first().username}"`, (err, count) => {
							
							
								if (err) {
									messageEmbed.setColor("#969C9F");
									messageEmbed.addField("Erro", "Erro na conexão da base de dados. Contacte alguém responsável");
									message.channel.send(messageEmbed);
									return;
								}
								messageEmbed.addField("Vitórias: ", `${Object.values(count)[0]}`, true);

								db.get(`select (select totalTugao from tugao where jogador = "${message.mentions.users.first().username}") / (select jornadas from tugao where jogador = "${message.mentions.users.first().username}");`, (err, media) => {
											
									if (err) {
										messageEmbed.setColor("#969C9F");
										messageEmbed.addField("Erro", "Erro na conexão da base de dados. Contacte alguém responsável");
										message.channel.send(messageEmbed);
										return;
									}

									if (Object.values(media)[0] !== null)		messageEmbed.addField("Média: ", `${Object.values(media)[0]}`, true);
									messageEmbed.addField('\u200B', '\u200B');
									messageEmbed.addField("Champions: ", `**${row.totalChampions}**`, true);
									
									db.get(`select count(*) + 1 from champions where totalChampions > (select totalChampions from champions where jogador = "{message.mentions.users.first().username}")`, (err, position) => {
										
										
										if (err) {
											messageEmbed.setColor("#969C9F");
											messageEmbed.addField("Erro", "Erro na conexão da base de dados. Contacte alguém responsável");
											message.channel.send(messageEmbed);
											return;
										}
										
										messageEmbed.addField("Posição:", `${Object.values(position)[0]}º`);
										
										db.get(`select count(*) from vencedoresChampions where jogador = "${message.mentions.users.first().username}"`, (err, count) => {
										
											if (err) {
												messageEmbed.setColor("#969C9F");
												messageEmbed.addField("Erro", "Erro na conexão da base de dados. Contacte alguém responsável");
												message.channel.send(messageEmbed);
												return;
											}
											
											messageEmbed.addField("Vitórias: ", `${Object.values(count)[0]}`, true)

											db.get(`select (select totalChampions from champions where jogador = "${message.mentions.users.first().username}") / (select jornadas from champions where jogador = "${message.mentions.users.first().username}");`, (err, media) => {
												
												if (err) {
													messageEmbed.setColor("#969C9F");
													messageEmbed.addField("Erro", "Erro na conexão da base de dados. Contacte alguém responsável");
													message.channel.send(messageEmbed);
													return;
												}
												
												if (Object.values(media)[0] !== null)		messageEmbed.addField("Média: ", `${Object.values(media)[0]}`, true);
												messageEmbed.addField('\u200B', '\u200B');
												messageEmbed.addField("Best Of: ", `**${row.totalBestOf}**`, true);
												
												db.get(`select count(*) + 1 from bestof where totalBestOf > (select totalBestOf from bestof where jogador = "{message.mentions.users.first().username}")`, (err, position) => {
													
													
													if (err) {
														messageEmbed.setColor("#969C9F");
														messageEmbed.addField("Erro", "Erro na conexão da base de dados. Contacte alguém responsável");
														message.channel.send(messageEmbed);
														return;
													}
													
													messageEmbed.addField("Posição:", `${Object.values(position)[0]}º`);
													
													db.get(`select count(*) from vencedoresBestOf where jogador = "${message.mentions.users.first().username}"`, (err, count) => {
												
														if (err) {
															messageEmbed.setColor("#969C9F");
															messageEmbed.addField("Erro", "Erro na conexão da base de dados. Contacte alguém responsável");
															message.channel.send(messageEmbed);
															return;
														}
														
														messageEmbed.addField("Vitórias: ", `${Object.values(count)[0]}`, true)
														db.get(`select (select totalBestOf from bestof where jogador = "${message.mentions.users.first().username}") / (select jornadas from bestof where jogador = "${message.mentions.users.first().username}");`, (err, media) => {
													
															if (err) {
																messageEmbed.setColor("#969C9F");
																messageEmbed.addField("Erro", "Erro na conexão da base de dados. Contacte alguém responsável");
																message.channel.send(messageEmbed);
																return;
															}
															
															if (Object.values(media)[0] !== null)		messageEmbed.addField("Média: ", `${Object.values(media)[0]}`, true);
															messageEmbed.addField('\u200B', '\u200B');
															messageEmbed.addField("Total Discordiano: ", `**${row.totalDiscordiano}**`);

															
															db.get(`select count(*) + 1 from total where totalDiscordiano > (select totalDiscordiano from total where jogador = "{message.mentions.users.first().username}")`, (err, position) => {
																
																
																if (err) {
																	messageEmbed.setColor("#969C9F");
																	messageEmbed.addField("Erro", "Erro na conexão da base de dados. Contacte alguém responsável");
																	message.channel.send(messageEmbed);
																	return;
																}
																
																messageEmbed.addField("Posição:", `${Object.values(position)[0]}º`);

																message.channel.send(messageEmbed);

															});
														});
													});
												});
											});
										});
									});
								});
							});
						});
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
		});
	}
}
