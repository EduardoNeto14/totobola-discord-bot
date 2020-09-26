const Discord = require("discord.js");

module.exports = {
	name : "comandos",
	description : "Iniciar época do Totobola",
	execute(message, args) {
        
        const messageEmbed = new Discord.MessageEmbed().setTitle("Comandos Totobola");
        messageEmbed.setColor("#0099E1");
        
        if (Object.keys(args).length === 0) {

            messageEmbed.addFields(
                {name: "**!totobola**"           ,     value: "Inicia o Totobola Discordiano"                   },
                {name: "**!registar**"           ,     value: "Registar-se na competição"                       },
                {name: "**!player**"             ,     value: "Informações acerca do jogador"                   },
                {name: "**!comandos**"           ,     value: "Informações acerca dos comandos do bot"          },
                {name: "**!apostartugao**"       ,     value: "Regista a aposta de um jogador (Tugão)"          },
                {name: "**!updatetugao**"        ,     value: "Atualiza a aposta de um jogador (Tugão)"         },
                {name: "**!starttugao**"         ,     value: "Iniciar jornada do Tugão"                        },
                {name: "**!cleantugao**"         ,     value: "Limpa uma jornada do Tugão"                      },
                {name: "**!stoptugao**"          ,     value: "Termina uma jornada do Tugão"                    },
                {name: "**!apostarchampions**"   ,     value: "Regista a aposta de um jogador (Champions)"      },
                {name: "**!updatechampions**"    ,     value: "Atualiza a aposta de um jogador (Champions)"     },
                {name: "**!startchampions**"     ,     value: "Iniciar jornada do Champions"                    },
                {name: "**!cleanchampions**"     ,     value: "Limpa uma jornada do Champions"                  },
                {name: "**!stopchampions**"      ,     value: "Termina uma jornada do Champions"                },
                {name: "**!apostarbestof**"      ,     value: "Regista a aposta de um jogador (Best Of)"        },
                {name: "**!updatebestof**"       ,     value: "Atualiza a aposta de um jogador (Best Of)"       },
            );
            messageEmbed.setFooter("1/2");
            message.channel.send(messageEmbed);
            messageEmbed.fields = [];
            messageEmbed.addFields(
                {name: "**!startbestof**"        ,     value: "Iniciar jornada do Best Of"                      },
                {name: "**!cleanbestof**"        ,     value: "Limpa uma jornada do Best Of"                    },
                {name: "**!stopbestof**"         ,     value: "Termina uma jornada do Best Of"                  },
                {name: "**!tugao**"              ,     value: "Tabela do Tugão"                                 },
                {name: "**!champions**"          ,     value: "Tabela da Champions"                             },
                {name: "**!bestof**"             ,     value: "Tabela do Best Of"                               },
                {name: "**!total**"              ,     value: "Tabela do Total"                                 },
                {name: "**!vencedorestugao**"    ,     value: "Vencedores do Tugão"                             },
                {name: "**!vencedoreschampions**",     value: "Vencedores da Champions"                         },
                {name: "**!vencedoresbestof**"   ,     value: "Vencedores do Best Of"                           },
                {name: "**!minhaaposta**"        ,     value: "Verificar aposta registada"                      },
                {name: "**!jornada**"            ,     value: "Verificar jornada ativa"                         },
                {name: "**!minhaaposta**"        ,     value: "Mostra a sua aposta de uma competição especifica"},
                );
            messageEmbed.setFooter("2/2");
        }

        else if (Object.keys(args).length > 1) {

            messageEmbed.setColor("");
            messageEmbed.setDescription("Estás a forncecer demasiados argumentos.\n\nPodes especificar um comando ou nenhum, dando acesso a uma descrição de todos os comandos.");
        }

        else {

            if (args[0] === "!totobola") {
                messageEmbed.setDescription("**!totobola** deve ser utilizado antes de tudo o resto.\n\n**Utilização:**\n!totobola");
                messageEmbed.addFields(
                    {name: "Erro", value: "Utilizador não tem permissão para utilizar comando"}
                );
            }
            else if (args[0] === "!apostartugao") {
                messageEmbed.setDescription("**!apostartugao** é o comando para registar a aposta de um jogador numa jornada.\n\n**Utilização:**\n!apostartugao\nJogo1: {Resultado}{*}");
                messageEmbed.addFields(
                    {name: "Argumento", value: "Resultado deve ser separado por um '-'"},
                    {name: "Argumento", value: "Joker deve ser marcado com um '*'"},
                    {name: "Erro", value: "Resultado inválido"},
                    {name: "Erro", value: "Nº de jogos incorreto"},
                    {name: "Erro", value: "Falha na conexão com base de dados"},
                    {name: "Erro", value: "Utilizador não registado"},
                    {name: "Erro", value: "Jornada não ativa"}

                );
            }
            else if (args[0] === "!starttugao") {
                messageEmbed.setDescription("**!starttugao** é o comando para dar início a uma jornada do Tugão.\n\n**Utilização:**\n!starttugao {Jornada}\nJogo1:");
                messageEmbed.addFields(
                    {name: "Argumento", value: "Especificar o número da jornada"},
                    {name: "Argumento", value: "Jogo deve ser especificado com ':' no fim"},
                    {name: "Erro", value: "Nº jornada inválida. Deve ser um valor inteiro"},
                    {name: "Erro", value: "Falha na conexão com base de dados"},
                    {name: "Erro", value: "Utilizador não tem permissão para utilizar comando"}
                );
            }
            else if (args[0] === "!updatetugao") {
                messageEmbed.setDescription("**!updatetugao** é o comando para dar atualizar a aposta do Tugão.\n\n**Utilização:**\n!updatetugao\n{Jogo1:} {Resultado}");
                messageEmbed.addFields(
                    {name: "Argumento", value: "Especificar o(s) jogo(s) tal e qual como iniciado por um dos administradores"},
                    {name: "Argumento", value: "Jogo deve ser especificado com ':' no fim"},
                    {name: "Erro", value: "Jornada não ativa"},
                    {name: "Erro", value: "Aposta não registada"},
                    {name: "Erro", value: "Falha na conexão com base de dados"},
                    {name: "Erro", value: "Jogos não indicados"},
                    {name: "Erro", value: "Utilizador não tem permissão para utilizar comando"}
                );
            }
            else if (args[0] === "!cleantugao") {
                messageEmbed.setDescription("**!cleantugao** é o comando para dar limpar uma jornada do Tugão, em caso de erro.\n\n**Utilização:**\n!cleantugao {Jornada}");
                messageEmbed.addFields(
                    {name: "Argumento", value: "Especificar o número da jornada"},
                    {name: "Erro", value: "Nº jornada inválida. Deve ser um valor inteiro e de uma jornada ativa"},
                    {name: "Erro", value: "Falha na conexão com base de dados"},
                    {name: "Erro", value: "Utilizador não tem permissão para utilizar comando"}
                );
            }
            else if (args[0] === "!stoptugao") {
                messageEmbed.setDescription("**!stoptugao** é o comando para dar terminar uma jornada do Tugão.\n\n**Utilização:**\n!stoptugao {Jornada}\n{Resultado}");
                messageEmbed.addFields(
                    {name: "Argumento", value: "Especificar o número da jornada"},
                    {name: "Argumento", value: "Resultados dos jogos"},
                    {name: "Erro", value: "Nº jornada inválida."},
                    {name: "Erro", value: "Argumentos insuficientes"},
                    {name: "Erro", value: "Resultado inválido"},
                    {name: "Erro", value: "Nº jogos inválido"},
                    {name: "Erro", value: "Falha na conexão com base de dados"},
                    {name: "Erro", value: "Utilizador não tem permissão para utilizar comando"}
                );
            }

            else if (args[0] === "!apostarchampions") {
                messageEmbed.setDescription("**!apostarchampions** é o comando para registar a aposta de um jogador numa jornada.\n\n**Utilização:**\n!apostarchampions\nJogo1: {Resultado}{*}");
                messageEmbed.addFields(
                    {name: "Argumento"   , value: "Resultado deve ser separado por um '-'"},
                    {name: "Argumento"   , value: "Joker deve ser marcado com um '*'"},
                    {name: "Erro"        , value: "Resultado inválido"},
                    {name: "Erro"        , value: "Nº de jogos incorreto"},
                    {name: "Erro"        ,  value: "Falha na conexão com base de dados"},
                    {name: "Erro"        , value: "Utilizador não registado"},
                    {name: "Erro"        , value: "Jornada não ativa"}

                );
            }
            else if (args[0] === "!startchampions") {
                messageEmbed.setDescription("**!startchampions** é o comando para dar início a uma jornada do Champions.\n\n**Utilização:**\n!startchampions {Jornada}\nJogo1:");
                messageEmbed.addFields(
                    {name: "Argumento", value: "Especificar o número da jornada"},
                    {name: "Argumento", value: "Jogo deve ser especificado com ':' no fim"},
                    {name: "Erro", value: "Nº jornada inválida. Deve ser um valor inteiro"},
                    {name: "Erro", value: "Falha na conexão com base de dados"},
                    {name: "Erro", value: "Utilizador não tem permissão para utilizar comando"}
                );
            }
            else if (args[0] === "!updatechampions") {
                messageEmbed.setDescription("**!updatechampions** é o comando para dar atualizar a aposta do Champions.\n\n**Utilização:**\n!updatechampions\n{Jogo1:} {Resultado}");
                messageEmbed.addFields(
                    {name: "Argumento", value: "Especificar o(s) jogo(s) tal e qual como iniciado por um dos administradores"},
                    {name: "Argumento", value: "Jogo deve ser especificado com ':' no fim"},
                    {name: "Erro", value: "Jornada não ativa"},
                    {name: "Erro", value: "Aposta não registada"},
                    {name: "Erro", value: "Falha na conexão com base de dados"},
                    {name: "Erro", value: "Jogos não indicados"},
                    {name: "Erro", value: "Utilizador não tem permissão para utilizar comando"}
                );
            }
            else if (args[0] === "!cleanchampions") {
                messageEmbed.setDescription("**!cleanchampions** é o comando para dar limpar uma jornada do Champions, em caso de erro.\n\n**Utilização:**\n!cleanchampions {Jornada}");
                messageEmbed.addFields(
                    {name: "Argumento", value: "Especificar o número da jornada"},
                    {name: "Erro", value: "Nº jornada inválida. Deve ser um valor inteiro e de uma jornada ativa"},
                    {name: "Erro", value: "Falha na conexão com base de dados"},
                    {name: "Erro", value: "Utilizador não tem permissão para utilizar comando"}
                );
            }
            else if (args[0] === "!stopchampions") {
                messageEmbed.setDescription("**!stopchampions** é o comando para dar terminar uma jornada do Champions.\n\n**Utilização:**\n!stopchampions {Jornada}\n{Resultado}");
                messageEmbed.addFields(
                    {name: "Argumento", value: "Especificar o número da jornada"},
                    {name: "Argumento", value: "Resultados dos jogos"},
                    {name: "Erro", value: "Nº jornada inválida."},
                    {name: "Erro", value: "Argumentos insuficientes"},
                    {name: "Erro", value: "Resultado inválido"},
                    {name: "Erro", value: "Nº jogos inválido"},
                    {name: "Erro", value: "Falha na conexão com base de dados"},
                    {name: "Erro", value: "Utilizador não tem permissão para utilizar comando"}
                );
            }
            else if (args[0] === "!apostarbestof") {
                messageEmbed.setDescription("**!apostarbestof** é o comando para registar a aposta de um jogador numa jornada.\n\n**Utilização:**\n!apostarbestof\nJogo1: {Resultado}{*}");
                messageEmbed.addFields(
                    {name: "Argumento", value: "Resultado deve ser separado por um '-'"},
                    {name: "Argumento", value: "Joker deve ser marcado com um '*'"},
                    {name: "Erro", value: "Resultado inválido"},
                    {name: "Erro", value: "Nº de jogos incorreto"},
                    {name: "Erro", value: "Falha na conexão com base de dados"},
                    {name: "Erro", value: "Utilizador não registado"},
                    {name: "Erro", value: "Jornada não ativa"}

                );
            }
            else if (args[0] === "!startbestof") {
                messageEmbed.setDescription("**!startbestof** é o comando para dar início a uma jornada do Best Of.\n\n**Utilização:**\n!startbestof {Jornada}\nJogo1:");
                messageEmbed.addFields(
                    {name: "Argumento", value: "Especificar o número da jornada"},
                    {name: "Argumento", value: "Jogo deve ser especificado com ':' no fim"},
                    {name: "Erro", value: "Nº jornada inválida. Deve ser um valor inteiro"},
                    {name: "Erro", value: "Falha na conexão com base de dados"},
                    {name: "Erro", value: "Utilizador não tem permissão para utilizar comando"}
                );
            }
            else if (args[0] === "!updatebestof") {
                messageEmbed.setDescription("**!updatebestof** é o comando para dar atualizar a aposta do Best Of.\n\n**Utilização:**\n!updatebestof\n{Jogo1:} {Resultado}");
                messageEmbed.addFields(
                    {name: "Argumento", value: "Especificar o(s) jogo(s) tal e qual como iniciado por um dos administradores"},
                    {name: "Argumento", value: "Jogo deve ser especificado com ':' no fim"},
                    {name: "Erro", value: "Jornada não ativa"},
                    {name: "Erro", value: "Aposta não registada"},
                    {name: "Erro", value: "Falha na conexão com base de dados"},
                    {name: "Erro", value: "Jogos não indicados"},
                    {name: "Erro", value: "Utilizador não tem permissão para utilizar comando"}
                );
            }
            else if (args[0] === "!cleanbestof") {
                messageEmbed.setDescription("**!cleanbestof** é o comando para dar limpar uma jornada do Best Of, em caso de erro.\n\n**Utilização:**\n!cleanbestof {Jornada}");
                messageEmbed.addFields(
                    {name: "Argumento", value: "Especificar o número da jornada"},
                    {name: "Erro", value: "Nº jornada inválida. Deve ser um valor inteiro e de uma jornada ativa"},
                    {name: "Erro", value: "Falha na conexão com base de dados"},
                    {name: "Erro", value: "Utilizador não tem permissão para utilizar comando"}
                );
            }
            else if (args[0] === "!stopbestof") {
                messageEmbed.setDescription("**!stopbestof** é o comando para dar terminar uma jornada do Best Of.\n\n**Utilização:**\n!stopbestof {Jornada}\n{Resultado}");
                messageEmbed.addFields(
                    {name: "Argumento", value: "Especificar o número da jornada"},
                    {name: "Argumento", value: "Resultados dos jogos"},
                    {name: "Erro", value: "Nº jornada inválida."},
                    {name: "Erro", value: "Argumentos insuficientes"},
                    {name: "Erro", value: "Resultado inválido"},
                    {name: "Erro", value: "Nº jogos inválido"},
                    {name: "Erro", value: "Falha na conexão com base de dados"},
                    {name: "Erro", value: "Utilizador não tem permissão para utilizar comando"}
                );
            }
            else if (args[0] === "!tugao") {
                messageEmbed.setDescription("**!tugao** é o comando para dar aceder à tabela do Tugão.\n\n**Utilização:**\n!tugao {Jogador (opcional)}");
                messageEmbed.addFields(
                    {name: "Argumento", value: "Se o jogador não for especificado, o top 25 do Tugão será apresentado"},
                    {name: "Argumento", value: "Se o jogador for especificado, informações sobre o jogador serão apresentadas"},
                    {name: "Erro", value: "Demasiados argumentos"},
                    {name: "Erro", value: "Jogador inválido"},
                    {name: "Erro", value: "Falha na conexão com base de dados"}
                );
            }
            else if (args[0] === "!champions") {
                messageEmbed.setDescription("**!champions** é o comando para dar aceder à tabela da Champions.\n\n**Utilização:**\n!champions {Jogador (opcional)}");
                messageEmbed.addFields(
                    {name: "Argumento", value: "Se o jogador não for especificado, o top 25 da Champions será apresentado"},
                    {name: "Argumento", value: "Se o jogador for especificado, informações sobre o jogador serão apresentadas"},
                    {name: "Erro", value: "Demasiados argumentos"},
                    {name: "Erro", value: "Jogador inválido"},
                    {name: "Erro", value: "Falha na conexão com base de dados"}
                );
            }
            else if (args[0] === "!bestof") {
                messageEmbed.setDescription("**!bestof** é o comando para dar aceder à tabela do Best Of.\n\n**Utilização:**\n!bestof {Jogador (opcional)}");
                messageEmbed.addFields(
                    {name: "Argumento", value: "Se o jogador não for especificado, o top 25 do Best Of será apresentado"},
                    {name: "Argumento", value: "Se o jogador for especificado, informações sobre o jogador serão apresentadas"},
                    {name: "Erro", value: "Demasiados argumentos"},
                    {name: "Erro", value: "Jogador inválido"},
                    {name: "Erro", value: "Falha na conexão com base de dados"}
                );
            }
            else if (args[0] === "!total") {
                messageEmbed.setDescription("**!total** é o comando para dar aceder à tabela do Totobola.\n\n**Utilização:**\n!total {Jogador (opcional)}");
                messageEmbed.addFields(
                    {name: "Argumento", value: "Se o jogador não for especificado, o top 25 do Totobola será apresentado"},
                    {name: "Argumento", value: "Se o jogador for especificado, informações sobre o jogador serão apresentadas"},
                    {name: "Erro", value: "Demasiados argumentos"},
                    {name: "Erro", value: "Jogador inválido"},
                    {name: "Erro", value: "Falha na conexão com base de dados"}
                );
            }
            else if (args[0] === "!player") {
                messageEmbed.setDescription("**!player** é o comando para dar aceder a informações sobre o jogador.\n\n**Utilização:**\n!player {Jogador (opcional)}");
                messageEmbed.addFields(
                    {name: "Argumento", value: "Especificar o jogador que quer."},
                    {name: "Erro", value: "Nº de argumentos inválido"},
                    {name: "Erro", value: "Jogador inválido"},
                    {name: "Erro", value: "Falha na conexão com base de dados"}
                );
            }
            else if (args[0] === "!registar") {
                messageEmbed.setDescription("**!registar** é o comando para registar o jogador na competição.\n\n**Utilização:**\n!registar");
                messageEmbed.addFields(
                    {name: "Erro", value: "Nº de argumentos inválido"},
                    {name: "Erro", value: "Falha na conexão com base de dados"}
                );
            }
            else if (args[0] === "!vencedorestugao") {
                messageEmbed.setDescription("**!vencedorestugao** é o comando para listar todos os vencedores da competição.\n\n**Utilização:**\n!vencedorestugao {jogador}");
                messageEmbed.addFields(
                    {name: "Argumento", value: "Se especificar o jogador, dá informações sobre o mesmo"},
                    {name: "Erro", value: "Nº de argumentos inválido"},
                    {name: "Erro", value: "Falha na conexão com base de dados"},
                    {name: "Erro", value: "Jogador não inscrito"}
                );
            }
            else if (args[0] === "!vencedoreschampions") {
                messageEmbed.setDescription("**!vencedoreschampions** é o comando para listar todos os vencedores da competição.\n\n**Utilização:**\n!vencedoreschampions {jogador}");
                messageEmbed.addFields(
                    {name: "Argumento", value: "Se especificar o jogador, dá informações sobre o mesmo"},
                    {name: "Erro", value: "Nº de argumentos inválido"},
                    {name: "Erro", value: "Falha na conexão com base de dados"},
                    {name: "Erro", value: "Jogador não inscrito"}
                );
            }
            else if (args[0] === "!vencedoresbestof") {
                messageEmbed.setDescription("**!vencedoresbestof** é o comando para listar todos os vencedores da competição.\n\n**Utilização:**\n!vencedoresbestof {jogador}");
                messageEmbed.addFields(
                    {name: "Argumento", value: "Se especificar o jogador, dá informações sobre o mesmo"},
                    {name: "Erro", value: "Nº de argumentos inválido"},
                    {name: "Erro", value: "Falha na conexão com base de dados"},
                    {name: "Erro", value: "Jogador não inscrito"}
                );
            }
            else if (args[0] === "!minhaaposta") {
                messageEmbed.setDescription("**!minhaaposta** é o comando para verificar uma aposta registada.\n\n**Utilização:**\n!minhaaposta {competição}");
                messageEmbed.addFields(
                    {name: "Argumento", value: "Tem que ser especificada a competição da aposta registada"},
                    {name: "Erro", value: "Nº de argumentos inválido"},
                    {name: "Erro", value: "Falha na conexão com base de dados"},
                    {name: "Erro", value: "Jogador não inscrito"},
                    {name: "Erro", value: "Nenhuma aposta registada"}
                );
            }
            else {
                messageEmbed.setColor("");
                messageEmbed.addFields(
                    {name: "Erro", value: "Não reconheço esse comando"}
                );
            }
        }
        message.channel.send(messageEmbed);
    }
}