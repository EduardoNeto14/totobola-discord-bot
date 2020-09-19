const sqlite3 = require("sqlite3");
const path = require("path");
const dbpath = path.resolve(__dirname, "../base-dados/totobola.db");
const Discord = require("discord.js");

function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}

module.exports = {
	name : "updatechampions",
	description : "Atualizar resultado do Champions",
	execute(message, args) {
		const messageEmbed = new Discord.MessageEmbed().setTitle("Aposta Champions");
		
		if (Object.keys(args).length == 0) {
		
			messageEmbed.setColor("#969C9F");
			messageEmbed.setDescription("Para atualizar algum jogo, tens que o indicar!");
			messageEmbed.addField("Erro", "Jogos não indicados!");
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
				
				let n_jogos;
				let tabela;
				
				db.all("select * from jornadas where estado = 'y'", (err, rows) => {
					
					if (err) {
						messageEmbed.setColor("#969C9F");
						messageEmbed.addField("Erro", "Erro na conexão da base de dados. Contacte alguém responsável");
						message.channel.send(messageEmbed);
						return;
					}
					
					rows.forEach( (jornada) => {
										
						if (jornada.jornada.includes("champions")) { 
							n_jogos = jornada.jogos;
							tabela = jornada.jornada;
						}
					});

					if (typeof tabela === "undefined") {
						messageEmbed.setColor("#969C9F");
						messageEmbed.addField("Erro", "Não existe nenhuma jornada ativa de momento.");
						message.channel.send(messageEmbed);
					}

					else {

						db.get(`select * from ${tabela} where jogador = ?`, [`${message.author.username}`], (err, row) => {
							
							if (err) {
								messageEmbed.setColor("#969C9F");
								messageEmbed.addField("Erro", "Erro na conexão da base de dados. Contacte alguém responsável");
								message.channel.send(messageEmbed);
								return;
							}
							
							if (typeof row === "undefined") {
								messageEmbed.setColor("#969C9F");
								messageEmbed.setDescription("Para atualizares algum jogo, precisas de ter uma aposta registada.\n\nUtiliza o comando **!apostarchampions**");
								messageEmbed.addField("Erro", "Não tem uma aposta registada");
								message.channel.send(messageEmbed);
							}
							
							else {
								db.get(`select * from ${tabela}_games`, (err, row) => {
									
									if (err) {
										messageEmbed.setColor("#969C9F");
										messageEmbed.addField("Erro", "Erro na conexão da base de dados. Contacte alguém responsável");
										message.channel.send(messageEmbed);
										return;
									}

									let matches = [];
									let nextRes = [];
									
									args.forEach( (jogo) => {
										
										var result = jogo.slice(jogo.lastIndexOf(":"), jogo.length).replace(/\s/g, "").replace(":", "").replace("o", "");
										
										if (((typeof result === "undefined") || (result.lenth < 3) || (isNaN(parseInt(result.substr(0, result.lastIndexOf("-"))))) || (isNaN(parseInt(result.substr(result.lastIndexOf("-") + 1, result.length))))) && (result !== "x-x")) {
											messageEmbed.setColor("#969C9F");
											messageEmbed.addField("Erro", `${result} é um resultado inválido`);
											return;
										}
										
										else{
											nextRes.push(result);
											var match = getKeyByValue(row, jogo.substr(0, jogo.indexOf(":")  +1 ));		//JOGO:
											if (typeof match !== "undefined") 				matches.push(match);
										}
									});
									
									if (matches.length === args.length) {
										
										db.get(`select * from ${tabela} where jogador = ?`,  message.author.username, (err, progs) => {
											
											if (err) {
												messageEmbed.setColor("#969C9F");
												messageEmbed.addField("Erro", "Erro na conexão da base de dados. Contacte alguém responsável");
												message.channel.send(messageEmbed);
												return;
											}
											
											let sql = `update ${tabela} set`; 
											let prevRes = [];

											messageEmbed.setAuthor(message.author.username, message.author.displayAvatarURL());
											messageEmbed.setColor("#A62019");
											
											for (const [index, match] of matches.entries()) {
												sql += ` ${match} = "${nextRes[index]}",`;
												messageEmbed.addField(`${row[matches]} `, `Alteraste de ${progs[match]} para ${nextRes[index]}`);
											}
											
											sql = sql.substr(0, sql.length -1);
											sql += ` where jogador = "${message.author.username}"`;
											console.log(sql);

											db.run(sql);

											message.channel.send(messageEmbed);
										});
					
									}
									else {
										
										messageEmbed.setAuthor(message.author.username, message.author.displayAvatarURL());
										messageEmbed.setColor("#969C9F");
										messageEmbed.setDescription("Para atualizares o jogo, tens que o indicar tal como um dos administradores.\n\n**Equipa x Equipa:**")
										messageEmbed.addField("Erro", "Verifica se os jogos correspondem ou se os resultados são válidos");
										message.channel.send(messageEmbed);
									}
								});
							}
						});
					}
				});
			});
		}
	}
}
