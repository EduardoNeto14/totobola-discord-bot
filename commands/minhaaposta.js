const sqlite3 = require("sqlite3");
const path = require("path");
const dbpath = path.resolve(__dirname, "../base-dados/totobola.db");
const Discord = require("discord.js");

module.exports = {
	name : "minhaaposta",

	description : "Mostrar a minha aposta",

	execute(message, args) {

        const messageEmbed = new Discord.MessageEmbed().setTitle("Aposta");
        messageEmbed.setAuthor(message.author.username, message.author.displayAvatarURL());

        let db = new sqlite3.Database(dbpath, sqlite3.OPEN_READONLY, (err) => {
            if (err) {
				messageEmbed.setColor("#969C9F");
				messageEmbed.addField("Erro", "Erro na conexão da base de dados. Contacte alguém responsável");
				message.channel.send(messageEmbed);
				return;
			}

            if ((Object.keys(args).length === 0) || (Object.keys(args).length > 1)) {
                messageEmbed.setColor("#969C9F");
                messageEmbed.setDescription("Nº de argumentos inválido");
                message.channel.send(messageEmbed);
            }
            else {
                if ((args[0] === "tugao") || (args[0] === "champions") || (args[0] === "bestof")) {
                    db.all("select * from jornadas where estado = 'y'", (err, rows) => {

                        if (err) {
                            messageEmbed.setColor("#969C9F");
                            messageEmbed.addField("Erro", "Erro na conexão da base de dados. Contacte alguém responsável");
                            message.channel.send(messageEmbed);
                            return;
                        }
            
                        let n_jogos;
                        let tabela;
            
                        rows.forEach( (jornada) => {		
                            if (jornada.jornada.includes(`${args[0]}`)) { 
                                n_jogos = jornada.jogos;
                                tabela = jornada.jornada;
                            }
                        });
                        
                        if (typeof tabela !== "undefined") {
                    
                            db.get(`select * from ${tabela}_games`, (err, games) => {

                                if (err) {
                                    messageEmbed.setColor("#969C9F");
                                    messageEmbed.addField("Erro", "Erro na conexão da base de dados. Contacte alguém responsável");
                                    message.channel.send(messageEmbed);
                                    return;
                                }

                                db.get(`select * from ${tabela} where jogador = ?`, [message.author.username], (err, row) => {
                            
                                    if (err) {
                                        messageEmbed.setColor("#969C9F");
                                        messageEmbed.addField("Erro", "Erro na conexão da base de dados. Contacte alguém responsável");
                                        message.channel.send(messageEmbed);
                                        return;
                                    }

                                    if (typeof row !== "undefined") {
                                        for (let g = 1; g <= n_jogos; g++) {
                                            messageEmbed.addField(`${games[`jogo${g}`]}`, `${row[`jogo${g}`]}`);
                                        }
                                        messageEmbed.setColor("#008369")
                                        message.channel.send(messageEmbed);
                                    }
                                    else {
                                        messageEmbed.setColor("#969C9F");
                                        messageEmbed.setDescription("Não tens nenhuma aposta registada nesta jornada");
                                        message.channel.send(messageEmbed);
                                    }
                                    
                                });
                            });
                        }
                        else {
                            messageEmbed.setColor("#969C9F");
                            messageEmbed.setDescription("Não existe nenhuma jornada ativa");
                            message.channel.send(messageEmbed);
                        }
                    });

                }
                else {
                    messageEmbed.setColor("#969C9F");
                    messageEmbed.setDescription("Competição inválida. \n\n\ Tenta **tugao**, **champions** ou **bestof**");
                    message.channel.send(messageEmbed);
                }

            }
        });
    }
}