const sqlite3 = require("sqlite3");
const path = require("path");
const dbpath = path.resolve(__dirname, "../base-dados/totobola.db");
const Discord = require("discord.js");

module.exports = {
    name : "resultados",
    description : "Resultados da jornada",
    execute(message, args) {

        const messageEmbed = new Discord.MessageEmbed().setTitle("Resultados da Jornada");
        messageEmbed.setColor("#FFFFFF");
        messageEmbed.setFooter(`${message.author.username}`, message.author.displayAvatarURL());

        if (Object.keys(args).length != 1) {
            messageEmbed.setDescription("Número de argumentos inválido.");
            
            message.channel.send(messageEmbed);
        }
        else {
            let db = new sqlite3.Database(dbpath, sqlite3.OPEN_READONLY, (err) => {
				
				if (err) {
					messageEmbed.setColor("#969C9F");
					messageEmbed.addField("Erro", "Erro na conexão da base de dados. Contacte alguém responsável");
					message.channel.send(messageEmbed);
					return;
                }
                

                console.log(`ARGS[0] -> ${args[0]}`);
                db.get(`select jornada from jornadas where jornada = "${args[0]}"`, (err, jornada) => {

                    if (err) {
                        console.log(`Erro -> ${err}\n`);
                        console.log(`Jornada -> ${jornada}\n`);
                        messageEmbed.setColor("#969C9F");
                        messageEmbed.addField("Erro", "Erro na conexão da base de dados. Contacte alguém responsável");
                        message.channel.send(messageEmbed);
                        return;
                    }
                    else {
                        if (typeof jornada === "undefined") {
                            messageEmbed.setDescription("A jornada não é válida.");
                            message.channel.send(messageEmbed);
                            return;
                        }
                        else {
                            db.all(`select jogador, pontuacao from ${args[0]} order by pontuacao desc`, (err, data) => {

                                if (err) {
                                    messageEmbed.setColor("#969C9F");
                                    messageEmbed.addField("Erro", "Erro na conexão da base de dados. Contacte alguém responsável");
                                    message.channel.send(messageEmbed);
                                    return;
                                }

                                let message_to_send = "";
                                //console.log("Jogador: ", data);
                                data.forEach( (resultado) => {
                                    resultado = Object.values(resultado);
                                    console.log(`Jogador: ${resultado[0]} - Resultado: ${resultado[1]}\n`);
                                    message_to_send += `**${resultado[0]}** - ${resultado[1]}\n`;
                                });
                                messageEmbed.setDescription(message_to_send);
                                messageEmbed.setColor("#8D4545");
                                message.channel.send(messageEmbed);
                            });
                        }
                    }
                });
            
            
            });
        }
    }
}