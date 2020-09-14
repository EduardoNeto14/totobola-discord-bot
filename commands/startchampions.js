const sqlite3 = require("sqlite3");
const path = require("path");
const dbpath = path.resolve(__dirname, "../base-dados/totobola.db");
const Discord = require("discord.js");

module.exports = {
	name : "startchampions",
	description : "Começar jornada do Champions",
	execute(message, args) {
		const messageEmbed = new Discord.MessageEmbed().setTitle("Champions");
		if (["MrRed", "Rouxinol Expansivo"].includes(message.author.username)) {
			
			if (Object.keys(args).length <= 1) {
				
				messageEmbed.setColor("#969C9F");
				messageEmbed.setDescription("Este comando dá início a uma jornada do Champions. Para iniciar, siga o exemplo:\n!startchampions\n{jornada}\nJogo 1\nJogo 2\nJogo n");
				messageEmbed.addField("Erro", "Argumentos insuficientes");
				message.channel.send(messageEmbed);
			}
			
			else {

				let db = new sqlite3.Database(dbpath, sqlite3.OPEN_READWRITE, (err) => {
					
					if (err) {
						messageEmbed.setColor("#969C9F");
						messageEmbed.addField("Erro", "Erro na conexão da base de dados. Contacte alguém responsável");
						message.channel.send(messageEmbed);
						return;
					}
					
					db.get(`select jornada from jornadas where jornada = "champions${args[0]}"`, (err, j) => {
						
						if (err) {
							messageEmbed.setColor("#969C9F");
							messageEmbed.addField("Erro", "Erro na conexão da base de dados. Contacte alguém responsável");
							message.channel.send(messageEmbed);
							return;
						}

						if ((isNaN(parseInt(args[0], 10))) || (typeof j !== "undefined")) {
						
							messageEmbed.setColor("#969C9F");
							messageEmbed.addField("Erro", "Nº jornada Inválida");
							message.channel.send(messageEmbed);
							return;
						}

						else {
							let sql = `CREATE TABLE champions${args[0]} (jogador text`;
							let placeholder = "(";
							
							for (let jogo = 1; jogo < Object.keys(args).length ; jogo++) {
								sql += `, jogo${jogo} text`;
								placeholder += "?,";
							}
							
							sql += `, pontuacao int);`;
							placeholder += "?)";
							
							db.run(sql);
							sql = sql.replace("jogador text, ", "").replace(", pontuacao int", "").replace(`champions${args[0]}`, `champions${args[0]}_games`);

							db.run(sql, (err) => {
								
								if (err) {
									messageEmbed.setColor("#969C9F");
									messageEmbed.addField("Erro", "Erro na conexão da base de dados. Contacte alguém responsável");
									message.channel.send(messageEmbed);
									return;
								}

								sql = sql.replace("CREATE TABLE", "INSERT INTO").replace(/ text/g, "").replace(";", "").substr(0, sql.length - 3);
								sql += " values ";
								sql += (placeholder.substr(0, placeholder.length -3) + ")");
								
								db.run(sql, args.slice(1, Object.keys(args).length), (err) => {	
									
									if (err) {
										messageEmbed.setColor("#969C9F");
										messageEmbed.addField("Erro", "Erro na conexão da base de dados. Contacte alguém responsável");
										message.channel.send(messageEmbed);
										return;
									}
									
									sql = `INSERT INTO jornadas(jornada, jogos, estado) VALUES(?, ?, ?)`;
									
									db.run(sql + ";", [`champions${args[0]}`, Object.keys(args).length - 1, 'y'], (err) => {
										
										if (err) {
											messageEmbed.setColor("#969C9F");
											messageEmbed.addField("Erro", "Erro na conexão da base de dados. Contacte alguém responsável");
											message.channel.send(messageEmbed);
											return;
										}
										messageEmbed.setColor('#e56b00');
										messageEmbed.setDescription("A jornada foi iniciada com sucesso.\n\nPodem apostar, utilizando o comando **!apostarchampions**");
										messageEmbed.addField("Jornada: ", `**${args[0]}**`);
										messageEmbed.addField("Jogos: ", `**${Object.keys(args).length - 1}**`);
										message.channel.send(messageEmbed);
									
									});
								});
							});
						}
					});
				});
			}
		}
		
		else {
			messageEmbed.setColor("");
			messageEmbed.addField("Erro: ", "Não tens permissão para executar este comando");			
		}
	}
}
