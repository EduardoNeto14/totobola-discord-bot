const sqlite3 = require("sqlite3");
const path = require("path");
const dbpath = path.resolve(__dirname, "../base-dados/totobola.db");
const Discord = require("discord.js");


function get_predictions(message, messageEmbed, args, db) {
	
	var results = [];

	try {
		let error = false;

		db.all("select * from jornadas where estado = 'y'", (err, rows) => {

			if (err) {
				messageEmbed.setColor("#969C9F");
				messageEmbed.addField("Erro", "Erro na conexão da base de dados. Contacte alguém responsável");
				message.channel.send(messageEmbed);
				return;
			}

			let n_jogos;
			let tabela;

			rows.forEach( (jornada, game) => {		
				if (jornada.jornada.includes("tugao")) { 
					n_jogos = jornada.jogos;
					tabela = jornada.jornada;
				}
			});
			
			db.get(`select * from ${tabela}_games`, (err, games) => {

				if (err) {
					messageEmbed.setColor("#969C9F");
					messageEmbed.addField("Erro", "Erro na conexão da base de dados. Contacte alguém responsável");
					message.channel.send(messageEmbed);
					return;
				}
				
				let has_joker = false;
				
				args.forEach( (result, g)  => {
					console.log(result);
					if (result.lastIndexOf("-") == -1) {    
						
						messageEmbed.setColor("#969C9F");
						messageEmbed.setDescription("A aposta deve ser feita da seguinte forma:\n!apostatugao\nEquipa1 x Equipa 2: 1-1(*, opcional)");
						messageEmbed.fields = [];
						messageEmbed.addField("Jogo: ", `**${result}**`);
						//message.channel.send(messageEmbed);
						
						error = true;
						return;
					}
			
					result = result.slice(result.lastIndexOf("-") - 3, result.lastIndexOf("-") + 3);
					result = result.replace(" ", "");
					result = result.replace(":", "");
					result = result.replace("o", "");

					if (((result.length < 3) || (isNaN(parseInt(result.substr(0, result.lastIndexOf("-"))))) || (isNaN(parseInt(result.substr(result.lastIndexOf("-") + 1, result.length))))) && (result !== "x-x")) {
						console.log("defeito\n");
						messageEmbed.setDescription("A aposta deve ser feita da seguinte forma:\n!apostatugao\nEquipa1 x Equipa 2: 1-1(*, opcional)");
						messageEmbed.setColor("#969C9F");
						messageEmbed.fields = [];
						
						messageEmbed.addField("Jogo: ", `**${result}**`);
						
						//message.channel.send(messageEmbed);
						
						error = true;
						return;
					}
			
					messageEmbed.addField(`${games[`jogo${g + 1}`]}`, `**${result}**`);
					results.push(result);
					
					if (result.includes("*") && !has_joker)		has_joker = true;
					else if (result.includes("*") && has_joker)	messageEmbed.addField("Aviso", "Tens mais que um joker. Apenas o primeiro será contado");
				});
				
				if (!error) {
					if (!has_joker)		messageEmbed.addField("Aviso", "**Não introduziste nenhum joker. Utiliza o *!updatetugao* **"); 
					db.get(`select jogador from ${tabela} where jogador = ?`, [message.author.username], (err, row) => {
						
						if (err) {
							messageEmbed.setColor("#969C9F");
							messageEmbed.addField("Erro", "Erro na conexão da base de dados. Contacte alguém responsável");
							message.channel.send(messageEmbed);
							return;
						}
						
						if (typeof row === "undefined") {
							
							if (results.length == n_jogos) {
								
								messageEmbed.setColor("#008E44");
								messageEmbed.setDescription("A sua aposta foi registada com sucesso. Obrigado!");
								messageEmbed.setAuthor(message.author.username, message.author.displayAvatarURL());
								
								let sql = `insert into ${tabela} values (?`;
								
								for (let count = 1; count <= n_jogos; count++) {
									sql += ",?";
								}
								
								sql += ",?)";
								
								db.run(sql, [message.author.username].concat(results).concat(0) , (err) => {
								
									if (err) {
										messageEmbed.setColor("#969C9F");
										messageEmbed.addField("Erro", "Erro na conexão da base de dados. Contacte alguém responsável");
										message.channel.send(messageEmbed);
										return;
									}
								});
						
								message.channel.send(messageEmbed);
							}

							else {
								messageEmbed.setColor("#969C9F");
								messageEmbed.addField("Erro", "Número de jogos incorreto");	
								message.channel.send(messageEmbed);
							}
							return;
						}
						
						else {
							messageEmbed.setColor("#969C9F");
							messageEmbed.setDescription("A sua aposta já foi registada. Podes atualizar os teus jogos utilizando o comando !updatetugao!")
							messageEmbed.fields = [];
							messageEmbed.addField("Erro", "A sua aposta já foi registada.");
							message.channel.send(messageEmbed);
						}
					});
				}

				else {
					messageEmbed.fields = [];
					message.channel.send(messageEmbed);
				}
			});
		});
	}

	catch (error) {
		console.log(error);
	}	
}

module.exports = {
	name : "apostartugao",
	description : "Regista a aposta no Tugão de um jogador",
	execute(message, args) {
		const messageEmbed = new Discord.MessageEmbed().setTitle("Aposta Tugão");
		
		if (Object.keys(args).length === 0) {
			messageEmbed.setColor("#969C9F");
			messageEmbed.addField("Erro" , "Tenta apostar em algum jogo");
			message.channel.send(messageEmbed);
			return;
		} 
		
		else {
				get_database(message, get_predictions, args);
		}
	}
}

function get_database(message, callback, args) {
	const messageEmbed = new Discord.MessageEmbed().setTitle("Aposta Tugão");
		
	let db = new sqlite3.Database(dbpath, sqlite3.OPEN_READWRITE, (err) => {
		if (err) {
			messageEmbed.setColor("#969C9F");
			messageEmbed.addField("Erro", "Erro na conexão da base de dados. Contacte alguém responsável");
			message.channel.send(messageEmbed);
			return;
		}
	});

	db.get("select * from participantes where jogador = ?", [message.author.username], (err, row) => {

		if (err) {
			messageEmbed.setColor("#969C9F");
			messageEmbed.addField("Erro", "Erro na conexão da base de dados. Contacte alguém responsável");
			message.channel.send(messageEmbed);
			return;
		}

		if (typeof row === "undefined") {
			messageEmbed.setColor("#969C9F");
			messageEmbed.addField("Erro", "Não te encontras registado\nUsa o comando **!registar**");
			message.channel.send(messageEmbed);
			return;
		}

		else {
			db.all("select * from jornadas where estado = ?", ["y"], (err, rows) => {

				if (err) {
					messageEmbed.setColor("#969C9F");
					messageEmbed.addField("Erro", "Erro na conexão da base de dados. Contacte alguém responsável");
					message.channel.send(messageEmbed);
					return;
				}

				else if (Object.keys(rows).length === 0) {
					messageEmbed.setColor("#969C9F");
					messageEmbed.addField("Erro", "Nenhuma jornada ativa de momento");
					message.channel.send(messageEmbed);
				}

				else {
					callback(message, messageEmbed, args, db);
				}
			});
		}
	});
}
