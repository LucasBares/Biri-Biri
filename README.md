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
  

# English

*Developed by:
`Taeko#0001` & `Rare Akuma ☆#6776`*


## Features:
**Emotions:** 
* Cute-Api - Neko.js -  Custom emotions *Check misc.js for the list of custom emotions*
* Meme about a user avatar
* NSFW Commands (Images and Video Search)
* Ship Commands
* Choose between two items
* Await for User Messages and Do Something with that
* Trello for recommendations
* Mute per user
* Enable/Disable commands per channel
* Weather Asking
* Server and User Information
* League of Legends User Profile (Beta only LAS )
* Fire Emblem Heros Stats Checks (Beta)

## Setup

* `git clone https://github.com/LucasBares/Biri-Biri-Staging.git`
* `cd Biri-Biri-Staging`
* `npm install --save`

## How to Run the Bot 

* `node login.js`

* Things you must change:
  * Token of bot = *login.js* `bot.login("bot token here");`
  * Token of Cute Api = *clients.js* `const cuteapi = new cute("cuteapi token here");`
  * Token, Key and Board Id of Trello = *clients.js* `const trello = new Trello("trello key here", "trello token here")` - *trello.js* `let boardId = "board id here"`
  * Sentry Uri = *login.js* `Raven.config(sentry_URI,{.....`
  * Node Env = *login.js* `let env = node_env...`
  * Database and Reclamo URL = *index.js* `class Database { connectionString: "url of the database"`
  * Riot Api Key = *custom.js line 39* `let apikey = "riot api key"`
  * Open Weather Api Key = *custom.js line 10* `let apikey = "openweather api key"`
  
