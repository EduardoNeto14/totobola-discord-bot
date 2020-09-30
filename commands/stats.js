const sqlite3 = require("sqlite3");
const path = require("path");
const dbpath = path.resolve(__dirname, "../base-dados/totobola.db");
const Discord = require("discord.js");

module.exports = {
    name : "stats",
    description : "Estatísticas da competição",
    execute(message, args) {

        const messageEmbed = new Discord.MessageEmbed().setTitle("Estatísticas Totobola");
        messageEmbed.setColor("#FFFFFF");
        messageEmbed.setFooter(`${message.author.username}`, message.author.displayAvatarURL());

        if (Object.keys(args).length != 0) {
            messageEmbed.setDescription("Número de argumentos inválido.");
            
            message.channel.send();
        }
        else {
            let message_to_send = "";

            let db = new sqlite3.Database(dbpath, sqlite3.OPEN_READWRITE, (err) => {
				
				if (err) {
					messageEmbed.setColor("#969C9F");
					messageEmbed.addField("Erro", "Erro na conexão da base de dados. Contacte alguém responsável");
					message.channel.send(messageEmbed);
					return;
                }
            
                db.get("select count(*) from participantes", (err, n_players) => {

                    if (err) {
                        messageEmbed.setColor("#969C9F");
                        messageEmbed.addField("Erro", "Erro na conexão da base de dados. Contacte alguém responsável");
                        message.channel.send(messageEmbed);
                        return;
                    }

                    message_to_send += `Número de jogadores: ${Object.values(n_players)[0]}\n`;

                    db.get("select count(*) from jornadas", (err, n_jornadas) => {

                        if (err) {
                            messageEmbed.setColor("#969C9F");
                            messageEmbed.addField("Erro", "Erro na conexão da base de dados. Contacte alguém responsável");
                            message.channel.send(messageEmbed);
                            return;
                        }
                        
                        message_to_send += `Número de jornadas: ${Object.values(n_jornadas)[0]}\n`;
                        message_to_send += "\nTUGÃO\n";

                        db.get("select sum(jornadas), sum(totalTugao) from tugao", (err, sum_tugao) => {

                            if (err) {
                                messageEmbed.setColor("#969C9F");
                                messageEmbed.addField("Erro", "Erro na conexão da base de dados. Contacte alguém responsável");
                                message.channel.send(messageEmbed);
                                return;
                            }
                            
                            console.log(sum_tugao);
                            message_to_send += `Número de apostas: **${Object.values(sum_tugao)[0]}**\n`;
                            message_to_send += `Total de pontos: **${Object.values(sum_tugao)[1]}**\n`;
                            message_to_send += `Média de pontos: **${Math.round((Object.values(sum_tugao)[1]/Object.values(sum_tugao)[0]) * 100) / 100}**\n`;
                            db.get("select sum(jornadas), sum(totalChampions) from champions", (err, sum_champs) => {

                                if (err) {
                                    messageEmbed.setColor("#969C9F");
                                    messageEmbed.addField("Erro", "Erro na conexão da base de dados. Contacte alguém responsável");
                                    message.channel.send(messageEmbed);
                                    return;
                                }
                                
                                message_to_send += "\n**CHAMPIONS**\n";
                                console.log(sum_champs);

                                if (typeof sum_champs == undefined) {
                                    message_to_send += "Ainda nenhuma aposta foi realizada nesta competição.\n"
                                }
                                else {
                                    if (Object.values(sum_champs)[0] == 0) {
                                        message_to_send += "Ainda nenhuma aposta foi realizada nesta competição.\n"
                                    }
                                    else {
                                        message_to_send += `Número de apostas: **${Object.values(sum_champs)[0]}**\n`;
                                        message_to_send += `Total de pontos: **${Object.values(sum_champs)[1]}**\n`;
                                        message_to_send += `Média de pontos: **${Math.round((Object.values(sum_champs)[1]/Object.values(sum_champs)[0]) * 100) / 100}**\n`;
                                    }
                                }
            
                            
                                db.get("select sum(jornadas), sum(totalBestOf) from bestof", (err, sum_bestof) => {

                                    if (err) {
                                        messageEmbed.setColor("#969C9F");
                                        messageEmbed.addField("Erro", "Erro na conexão da base de dados. Contacte alguém responsável");
                                        message.channel.send(messageEmbed);
                                        return;
                                    }
                                    
                                    message_to_send += "\n**BEST OF**\n";
                                    console.log(sum_bestof);
                                    message_to_send += `Número de apostas: **${Object.values(sum_bestof)[0]}**\n`;
                                    message_to_send += `Total de pontos: **${Object.values(sum_bestof)[1]}**\n`;
                                    message_to_send += `Média de pontos: **${Math.round((Object.values(sum_bestof)[1]/Object.values(sum_bestof)[0]) * 100) / 100}**\n`;
                
                                    db.get("select count(*), sum(totalDiscordiano) from total", (err, sum_total) => {

                                        if (err) {
                                            messageEmbed.setColor("#969C9F");
                                            messageEmbed.addField("Erro", "Erro na conexão da base de dados. Contacte alguém responsável");
                                            message.channel.send(messageEmbed);
                                            return;
                                        }
                                        
                                        message_to_send += "\n**TOTAL DISCORDIANO**\n";
                                        console.log(sum_total);
                                        message_to_send += `Total de pontos: **${Object.values(sum_total)[1]}\n**`;
                                        message_to_send += `Média de pontos: **${Math.round((Object.values(sum_total)[1]/Object.values(sum_total)[0]) * 100) / 100}**\n`;
                    

                                        console.log(message_to_send);
                                        messageEmbed.setDescription(message_to_send);
                                        message.channel.send(messageEmbed);
                                    });
                                
                                });
                            
                            });
        
                        });
                    });

                });
            });
        }
    }
}