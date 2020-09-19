const sqlite3 = require("sqlite3");
const path = require("path");
const dbpath = path.resolve(__dirname, "../base-dados/totobola.db");
const Discord = require("discord.js");

function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }

module.exports = {
    name: "alterarchampions",
    description: "Administradores podem alterar um jogo",

    execute(message, args) {
        const messageEmbed = new Discord.MessageEmbed().setTitle("Alterar Jogo");

        if (["MrRed", "Rouxinol Expansivo"].includes(message.author.username)) {
            
            if (Object.keys(args).length < 2) {
		
                messageEmbed.setColor("#969C9F");
                messageEmbed.setDescription("Para atualizar algum jogo, tens que o indicar!");
                messageEmbed.addField("Erro", "Jogos não indicados!");
                message.channel.send(messageEmbed);
                return;
            }

            if (typeof message.mentions.users.first() !== "undefined") {
                let db = new sqlite3.Database(dbpath, sqlite3.OPEN_READWRITE, (err) => {
                    if (err) {
						messageEmbed.setColor("#969C9F");
						messageEmbed.addField("Erro", "Erro na conexão da base de dados. Contacte alguém responsável");
						message.channel.send(messageEmbed);
						return;
                    }
                    
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
                                tabela = jornada.jornada;
                            }
                        });

                        if (typeof tabela === "undefined") {
                            messageEmbed.setColor("#969C9F");
                            messageEmbed.addField("Erro", "Não existe nenhuma jornada ativa de momento.");
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
                                
                                args.shift();
                                args.forEach( (jogo) => {
                                    console.log(`[Alterar Tugão] Arg -> ${jogo}`);
                                    var result = jogo.slice(jogo.lastIndexOf(":"), jogo.length).replace(/\s/g, "").replace(":", "").replace("o", "");
                                    
                                    if (((typeof result === "undefined") || (result.lenth < 3) || (isNaN(parseInt(result.substr(0, result.lastIndexOf("-"))))) || (isNaN(parseInt(result.substr(result.lastIndexOf("-") + 1, result.length))))) && (result !== "x-x")) {
                                        messageEmbed.setColor("#969C9F");
                                        messageEmbed.addField("Erro", `${result} é um resultado inválido`);
                                        return;
                                    }
                                    
                                    else{
                                        console.log(`[Alterar Tugão] Restultado -> ${result}`);
                                        nextRes.push(result);
                                        var match = getKeyByValue(row, jogo.substr(0, jogo.indexOf(":")  + 1 ));		//JOGO:
                                        console.log(`Match: ${match}`);
                                        if (typeof match !== "undefined") 				matches.push(match);
                                    }
                                });
                                
                                if (matches.length === args.length) {
                                    
                                    db.get(`select * from ${tabela} where jogador = ?`, [`${message.mentions.users.first().username}`], (err, progs) => {
                                        
                                        if (err) {
                                            messageEmbed.setColor("#969C9F");
                                            messageEmbed.addField("Erro", "Erro na conexão da base de dados. Contacte alguém responsável");
                                            message.channel.send(messageEmbed);
                                            return;
                                        }
                                        
                                        let sql = `update ${tabela} set`; 

                                        messageEmbed.setAuthor(message.mentions.users.first().username, message.mentions.users.first().displayAvatarURL());
                                        messageEmbed.setColor("#A62019");
                                        
                                        for (const [index, match] of matches.entries()) {
                                            sql += ` ${match} = "${nextRes[index]}",`;
                                            messageEmbed.addField(`${row[matches]} `, `Alteraste de ${progs[match]} para ${nextRes[index]}`);
                                        }
                                        
                                        sql = sql.substr(0, sql.length -1);
                                        sql += ` where jogador = "${message.mentions.users.first().username}"`;
                                        console.log(sql);

                                        db.run(sql);

                                        message.channel.send(messageEmbed);
                                    });
                
                                }
                                else {
                                    
                                    messageEmbed.setAuthor(message.mentions.users.first().username, message.mentions.users.first().displayAvatarURL());
                                    messageEmbed.setColor("#969C9F");
                                    messageEmbed.setDescription("Para atualizares o jogo, tens que o indicar tal como um dos administradores.\n\n**Equipa x Equipa:**")
                                    messageEmbed.addField("Erro", "Verifica se os jogos correspondem ou se os resultados são válidos");
                                    message.channel.send(messageEmbed);
                                }
                            });
                        }
                    
                    });
                
                });
            }
            else {
                messageEmbed.setColor("969C9F");
                messageEmbed.setDescription("Tens que especificar o jogador.\n\nObirgado.");
                message.channel.send(messageEmbed);
            }

        }
        else {
            messageEmbed.setColor("#969C9F");
            messageEmbed.setDescription("Apenas um administrador pode utilizar este comando.\n\nObrigado.");
            message.channel.send(messageEmbed);
        }
    }
}