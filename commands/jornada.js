const sqlite3 = require("sqlite3");
const path = require("path");
const dbpath = path.resolve(__dirname, "../base-dados/totobola.db");
const Discord = require("discord.js");

module.exports = {
    name: "jornada",
    description: "Lista jogos da jornada",

    execute(message, args) {

        const messageEmbed = new Discord.MessageEmbed().setTitle("Jornada");

        if (Object.keys(args).length == 0 || Object.keys(args).length > 1) {
		
			messageEmbed.setColor("#969C9F");
			messageEmbed.setDescription("Número de argumentos inválido!");
			messageEmbed.addField("Erro", "Argumentos inválidos");
			message.channel.send(messageEmbed);

		}

        else {

            if (["tugao", "champions", "bestof"].includes(args[0])) {
                let db = new sqlite3.Database(dbpath, sqlite3.OPEN_READWRITE, (err) => {
                    
                    if (err) {
                        messageEmbed.setColor("#969C9F");
                        messageEmbed.addField("Erro", "Erro na conexão da base de dados. Contacte alguém responsável");
                        message.channel.send(messageEmbed);
                        return;
                    }
                
                    db.all("select * from jornadas where estado = 'y'", (err, jornadas) => {
					
                        if (err) {
                            messageEmbed.setColor("#969C9F");
                            messageEmbed.addField("Erro", "Erro na conexão da base de dados. Contacte alguém responsável");
                            message.channel.send(messageEmbed);
                            return;
                        }
                        
                        let tabela;
                        jornadas.forEach( (jornada) => {           
                            if (jornada.jornada.includes(args[0])) { 
                                tabela = jornada.jornada;
                            }
                        });

                        if (typeof tabela === "undefined") {
                            messageEmbed.setColor("#969C9F");
                            messageEmbed.addField("Erro", "Não existe nenhuma jornada ativa de momento.");
                            message.channel.send(messageEmbed);
                        }

                        else {
                            db.get(`select * from ${tabela}_games`, (err, games) => {

                                if (err) {
                                    messageEmbed.setColor("#969C9F");
                                    messageEmbed.addField("Erro", "Erro na conexão da base de dados. Contacte alguém responsável");
                                    message.channel.send(messageEmbed);
                                    return;
                                }
                                
                                console.log(games);

                                games = Object.values(games);
                                let str_games = "";

                                for (const game of games) {
                                    console.log(game);
                                    str_games += `**${game}**\n`;
                                }

                                console.log(str_games);

                                messageEmbed.setColor("#FFFFFF");
                                messageEmbed.setDescription(str_games);
                                message.channel.send(messageEmbed);
                            });
                        }
                    });
                });
            }
            else {
                messageEmbed.setColor("#969C9F");
                messageEmbed.setDescription("Competição inválida!\nExperimenta usar !jornada tugao/champions/bestof\n\nObrigado!");
                messageEmbed.addField("Erro", "Competição inválida");
                message.channel.send(messageEmbed);
            }
        }
    }
}