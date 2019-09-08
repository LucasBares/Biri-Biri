# Biri Biri Bot
*Discord Bot for FAMFAMO*

## Notes:
This bot it's on the most part on Spanish, the English version it's a To-Do thing.

*Setup en [Español](https://github.com/LucasBares/Biri-Biri-Staging#espa%C3%B1ol)*

*Setup on [English](https://github.com/LucasBares/Biri-Biri-Staging#english)*


Agradecimientos a:
 
`Hiro Inu#1337, razpeitia#5174`


# Español

*Desarollado por :
`Taeko#0001` & `Rare Akuma ☆#6776`*

## Caracteristicas:

**Reacciones:** 
* Cute-Api - Neko.js -  Reacciones a Pedido *Revisar misc.js para la lista de emociones completa*
* Hacer un Meme con el Avatar de un Usuario
* Comandos NSFW (+18) (Busqueda de Videos e Imagenes)
* Comando de Shippeo entre dos Usuarios
* Elegir entre X cantidad de cosas
* Esperar mensajes de usuarios y reaccionar a ellos
* Integracion de Trello para recomendaciones
* Comando de Muteo por Usuario por Canal
* Activar/Desactivar comandos por Canal
* Consulta de Clima
* Informacion de Servidor y Usuario
* Busqueda de Perfiles de League of Legends (Solamente LAS disponible - En beta)
* Busqueda e Informacion de Heroes de Fire Emblem (Beta)

## Instalacion

* `git clone https://github.com/LucasBares/Biri-Biri-Staging.git`
* `cd Biri-Biri-Staging`
* `npm install --save`

## Como ejecutar el Bot

* `node login.js`

* Cosas que debes cambiar:
  * Token del bot = *login.js* `bot.login("bot token here");`
  * Token de Cute Api = *clients.js* `const cuteapi = new cute("cuteapi token here");`
  * Token, Key y Board Id de Trello = *clients.js* `const trello = new Trello("trello key here", "trello token here")` - *trello.js* `let boardId = "board id here"`
  * Sentry Uri = *login.js* `Raven.config(sentry_URI,{.....`
  * Node Env = *login.js* `let env = node_env...`
  * Riot Api Key = *custom.js linea 39* `let apikey = "riot api key`
  * Open Weather Api Key = *custom.js linea 10* `let apikey = "openweather api key"`
 
