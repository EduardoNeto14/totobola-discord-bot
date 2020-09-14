const sqlite3 = require("sqlite3");
const path = require("path");
const dbpath = path.resolve(__dirname, "../base-dados/totobola.db");
const Discord = require("discord.js");

module.exports = {
	name : "vencedorestugao",

	description : "Mostrar vencedores do Tugão",

	execute(message, args) {

        const messageEmbed = new Discord.MessageEmbed().setTitle("Vencedores Tugão");
        
        let db = new sqlite3.Database(dbpath, sqlite3.OPEN_READONLY, (err) => {
            
            if (err) {
				messageEmbed.setColor("#969C9F");
				messageEmbed.addField("Erro", "Erro na conexão da base de dados. Contacte alguém responsável");
				message.channel.send(messageEmbed);
				return;
			}
            
            if (Object.keys(args).length === 0) {

                db.all("select * from vencedoresTugao", (err, vencedores) => {
                    if (err) {
                        messageEmbed.setColor("#969C9F");
                        messageEmbed.addField("Erro", "Erro na conexão da base de dados. Contacte alguém responsável");
                        message.channel.send(messageEmbed);
                        return;
                    }

                    messageEmbed.setColor("#CC7900");
                    
                    if(Object.keys(vencedores).length === 0) {
                        messageEmbed.setDescription("Não existem vencedores ainda!");
                        message.channel.send(messageEmbed);
                    }
                    else {
                    
                        let limit = 25;
                        vencedores.forEach( (vencedor) => {

                            messageEmbed.addField(`${vencedor.jogador}`, `Pontos: ${vencedor.pontuacao} --- Jornada: ${vencedor.jornada}`);
                            limit--;

                            if (limit === 0 ) {
                                message.channel.send(messageEmbed);
                                limit = 25;
                            }
                        });
                        message.channel.send(messageEmbed);
                    }
                });

            }
            else if ((Object.keys(args).length === 1) && (typeof message.mentions.users.first() !== "undefined")) {
                db.all(`select * from vencedoresTugao where jogador = "${message.mentions.users.first().username}"`, (err, vitorias) => {

                    if (err) {
                        messageEmbed.setColor("#969C9F");
                        messageEmbed.addField("Erro", "Erro na conexão da base de dados. Contacte alguém responsável");
                        message.channel.send(messageEmbed);
                        return;
                    }

                    messageEmbed.setAuthor(message.mentions.users.first().username, message.mentions.users.first().displayAvatarURL());
                    
                    if (Object.keys(vitorias).length === 0) {
                        db.get(`select * from participantes where jogador = "${message.mentions.users.first().username}"`, (err, participante) => {
                            
                            if (err) {
                                messageEmbed.setColor("#969C9F");
                                messageEmbed.addField("Erro", "Erro na conexão da base de dados. Contacte alguém responsável");
                                message.channel.send(messageEmbed);
                                return;
                            }

                            if (typeof participante === "undefined") {
                                messageEmbed.setColor("");
                                messageEmbed.addField("Erro", "Jogador não está inscrito");
                                message.channel.send(messageEmbed);
                                return;
                            }
                            else {
                                messageEmbed.setColor("#CC7900");
                                messageEmbed.setDescription("Este jogador não tem qualquer vitória");
                                message.channel.send(messageEmbed);
                            }
                        });
                    }
                    else {
                        vitorias.forEach( (vitoria) => {
                            messageEmbed.addField("Vitória", `Jornada ${vitoria.jornada} com ${vitoria.pontuacao} pontos`);
                        });
                        messageEmbed.setColor("#CC7900");
                        message.channel.send(messageEmbed);
                    }
                });
            }
            else {
                messageEmbed.setColor("");
                messageEmbed.addField("Erro", "Demasiados argumentos");
                message.channel.send(messageEmbed);
                return;
            }
        });
    }
}