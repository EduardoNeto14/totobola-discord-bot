const sqlite3 = require("sqlite3");
const path = require("path");
const dbpath = path.resolve(__dirname, "../base-dados/totobola.db");
const Discord = require("discord.js");


function finalizar(messageEmbed, message, args, db) {

	db.run(`drop table tugao${args[0]}_games`, (err) => {
		if (err) {
			messageEmbed.setColor("#969C9F");
			messageEmbed.addField("Erro", "Erro na conexão da base de dados. Contacte alguém responsável");
			message.channel.send(messageEmbed);
			return;
		}
	

		db.run(`update jornadas set estado = "n" where jornada = "tugao${args[0]}"`, (err) => {

			if (err) {
				messageEmbed.setColor("#969C9F");
				messageEmbed.addField("Erro", "Erro na conexão da base de dados. Contacte alguém responsável");
				message.channel.send(messageEmbed);
				return;
			}
	
			db.all(`select jogador, pontuacao from tugao${args[0]} where pontuacao = (select max(pontuacao) from tugao${args[0]})`, (err, winners) => {
				
				if (err) {
					messageEmbed.setColor("#969C9F");
					messageEmbed.addField("Erro", "Erro na conexão da base de dados. Contacte alguém responsável");
					message.channel.send(messageEmbed);
					return;
				}

				messageEmbed.setTitle("Vencedor da Jornada");
				messageEmbed.setColor("#7A2F8F");
				
				winners.forEach( (winner) => {
					
					messageEmbed.addField(`**${winner.jogador}**`, `${winner.pontuacao}`);
					db.run(`insert into vencedoresTugao (jogador, pontuacao, jornada) values ("${winner.jogador}", ${winner.pontuacao}, "${args[0]}")`);
				
				});

				db.get(`select avg(pontuacao) from tugao${args[0]}`, (err, media) => {
					if (err) {
						messageEmbed.setColor("#969C9F");
						messageEmbed.addField("Erro", "Erro na conexão da base de dados. Contacte alguém responsável");
						message.channel.send(messageEmbed);
						return;
					}
					messageEmbed.addField("Média da Jornada: ", `${Object.values(media)[0]}`);
				
					message.channel.send(messageEmbed);
				});
			});
		});
	});
}

function calculo_tendencia(res) {
	console.log("Calculo Tendencia\n");
	console.log(res.substr(0, res.indexOf("-")), parseInt(res.substr(0, res.indexOf("-"))), (isNaN(parseInt(res.substr(0, res.indexOf("-"))))));
	console.log(res.substr(res.indexOf("-") + 1, res.length), parseInt(res.substr(res.indexOf("-") + 1, res.length)), (isNaN(parseInt(res.substr(res.indexOf("-"), res.length)))));
	
	if (res !== "n/a") {
		if ((isNaN(parseInt(res.substr(0, res.indexOf("-"))))) || (isNaN(parseInt(res.substr(res.indexOf("-") + 1, res.length)))))			{console.log("NULL"); return null;}
	}

	if 			(parseInt(res.substr(0, res.indexOf("-"))) 	> 	parseInt(res.substr(res.indexOf("-") + 1, res.length)))			return "c";
	else if 	(parseInt(res.substr(0, res.indexOf("-"))) 	==	parseInt(res.substr(res.indexOf("-") + 1, res.length)))			return "e";
	else if 	(parseInt(res.substr(0, res.indexOf("-"))) 	< 	parseInt(res.substr(res.indexOf("-") + 1, res.length)))			return "f";
	else if		(res === "n/a")																									return "a";
	else if 	((res === "x-x") || (res == "X-X"))																				return "n";																															
}

module.exports = {
	name : "stoptugao",

	description : "Terminar jornada do Tugão",

	execute(message, args) {
		
		try {
			const messageEmbed = new Discord.MessageEmbed().setTitle("Tugão");
			
			if (["MrRed", "Rouxinol Expansivo"].includes(message.author.username)) {
				
				if (Object.keys(args).length <= 1) {
					
					messageEmbed.setColor("#969C9F");
					messageEmbed.setDescription("O comando recebe mais argumentos do que os fornecidos.\n\nTenta usar:\n\n**!stoptugao**\n{Jornada ativa}\n{Resultado 1}\n{Resultado n}\n")
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

						else {
							db.get(`select estado from jornadas where jornada = ?`, [`tugao${args[0]}`], (err, estado) => {
								
								if (err) {
									messageEmbed.setColor("#969C9F");
									messageEmbed.addField("Erro", "Erro na conexão da base de dados. Contacte alguém responsável");
									message.channel.send(messageEmbed);
									return;
								}
								if ((typeof estado !== "undefined") && (Object.values(estado)[0] === 'y')) {
									db.all(`select * from tugao${args[0]}`, (err, progs) => {

										if (err) {
											messageEmbed.setColor("#969C9F");
											messageEmbed.addField("Erro", "Erro na conexão da base de dados. Contacte alguém responsável");
											message.channel.send(messageEmbed);
											return;
										}

										else {
											
											db.get(`select jogos from jornadas where jornada = ?`, [`tugao${args[0]}`], (err, n_jogos) => {
												
												if (err) {
													messageEmbed.setColor("#969C9F");
													messageEmbed.addField("Erro", "Erro na conexão da base de dados. Contacte alguém responsável");
													message.channel.send(messageEmbed);
													return;
												}

												if ( (args.length - 1) == n_jogos.jogos) {
													let tendencia_resultado = {};

													for (let tendencia = 1; tendencia <= n_jogos.jogos; tendencia++) {
														if (args[tendencia].length >= 3) {
															if (calculo_tendencia(args[tendencia]) === null)	{
																console.log("Returned NULL");
																messageEmbed.setColor("#969C9F");
																messageEmbed.addField("Erro", "Resultado fornecido inválido!");
																message.channel.send(messageEmbed);
																return;
															}
															tendencia_resultado[`jogo${tendencia}`]	= calculo_tendencia(args[tendencia]);
														}
														else {
															messageEmbed.setColor("#969C9F");
															messageEmbed.addField("Erro", "Resultado fornecido inválido!");
															message.channel.send(messageEmbed);
															return;
														}
													}
													
													let pontuacoes = {};

													for (const prog of Object.entries(progs)) {
														
														pontuacoes[`${prog[1]["jogador"]}`] = 0;	
														
														var joker = false;
														for (let game = 1; game <= n_jogos.jogos; game++) {

															if ((prog[1][`jogo${game}`].includes("*")) && !joker) {
																joker = true;
																if (prog[1][`jogo${game}`].substr(0,3) !== "x-x") { 
																	if 			(args[game] === prog[1][`jogo${game}`].substr(0, prog[1][`jogo${game}`].indexOf("*")).replace(/\s/g, ''))															pontuacoes[`${prog[1]["jogador"]}`] += 3*2;
																	else if		(calculo_tendencia(prog[1][`jogo${game}`].substr(0, prog[1][`jogo${game}`].indexOf("*")).replace(/\s/g, '')) === tendencia_resultado[`jogo${game}`])				pontuacoes[`${prog[1]["jogador"]}`] += 1*2; 
																}
															}
															else if ((prog[1][`jogo${game}`].includes("*")) && joker) {
																if 			(args[game] === prog[1][`jogo${game}`].substr(0, prog[1][`jogo${game}`].indexOf("*")).replace(/\s/g, ''))													pontuacoes[`${prog[1]["jogador"]}`] += 3; 
																else if		(calculo_tendencia(prog[1][`jogo${game}`].substr(0, prog[1][`jogo${game}`].indexOf("*")).replace(/\s/g, '')) === tendencia_resultado[`jogo${game}`])		pontuacoes[`${prog[1]["jogador"]}`] += 1;
															}
															else {
																if (prog[1][`jogo${game}`].substr(0,3) !== "x-x") { 
																	if 			(args[game] === prog[1][`jogo${game}`].replace(/\s/g, ''))															pontuacoes[`${prog[1]["jogador"]}`] += 3; 
																	else if		(calculo_tendencia(prog[1][`jogo${game}`].replace(/\s/g, '')) === tendencia_resultado[`jogo${game}`])				pontuacoes[`${prog[1]["jogador"]}`] += 1; 
																}
															}								
														}
														
														db.run(`update tugao${args[0]} set pontuacao = ${pontuacoes[`${prog[1]["jogador"]}`]} where jogador = "${prog[1]["jogador"]}"`, (err) => {
															if (err) {
																messageEmbed.setColor("#969C9F");
																messageEmbed.addField("Erro", "Erro na conexão da base de dados. Contacte alguém responsável");
																message.channel.send(messageEmbed);
																return;
															}
														

															db.run(`update tugao set jornadas = 																\
																	((select jornadas from tugao where jogador = "${prog[1]["jogador"]}") + 1), 					\
																	totalTugao = ((select totalTugao from tugao where jogador = "${prog[1]["jogador"]}") 			\
																	+ ${pontuacoes[`${prog[1]["jogador"]}`]}) where jogador = "${prog[1]["jogador"]}"`, (err) => {
																	
																if (err) {
																	messageEmbed.setColor("#969C9F");
																	messageEmbed.addField("Erro", "Erro na conexão da base de dados. Contacte alguém responsável");
																	message.channel.send(messageEmbed);
																	return;
																}
															
																db.run(`update total set totalTugao = 																\
																		(select totalTugao from tugao where jogador = "${prog[1]["jogador"]}"), 					\
																		totalDiscordiano = (select totalTugao from tugao where jogador = "${prog[1]["jogador"]}") 	\
																		+ (select totalChampions from champions where jogador = "${prog[1]["jogador"]}") 			\
																		+ (select totalBestOf from bestof where jogador = "${prog[1]["jogador"]}") 					\
																		where jogador = "${prog[1]["jogador"]}"`, (err) => {
																	
																	if (err) {
																		messageEmbed.setColor("#969C9F");
																		messageEmbed.addField("Erro", "Erro na conexão da base de dados. Contacte alguém responsável");
																		message.channel.send(messageEmbed);
																		return;
																	}	
																});
															});
														});
													}
													
													finalizar(messageEmbed, message, args, db);
													
												}

												else {

													messageEmbed.setColor("");
													messageEmbed.setDescription("O número de resultados fornecidos tem que ser igual ao número de jogos.")
													messageEmbed.addField("Erro", "Nº de jogos incorreto.");
													
													message.channel.send(messageEmbed);
												}

											});
										}
									});
								}
								else {
									messageEmbed.setColor("");
									messageEmbed.addField("Erro", "Jornada já foi terminada ou está incorreta");
									message.channel.send(messageEmbed);
								}
							});
						}
					});			
				}
			}
			else {
				messageEmbed.setColor("");
				messageEmbed.addField("Erro", "Não tens permissão para executar este comando...");

				message.channel.send(messageEmbed);
			}
		}
		catch (error) {
			console.log(error.message);
			const messageEmbed = new Discord.MessageEmbed().setTitle("Tugão");
			messageEmbed.setColor("");
			messageEmbed.addField("Erro", "Algo deu errado");
			message.channel.send(messageEmbed);
		}
	}
}